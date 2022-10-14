// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";
import redis from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tagsQuery = "tags=adios AND tags=hola";

  const cachedData = (await redis.get(tagsQuery)) as string;

  if (cachedData) {
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate");
    res.status(200).json(JSON.parse(cachedData));
    return;
  }

  try {
    const result = await cloudinary.search
      .expression("tags=adios AND tags=hola")
      .with_field("tags")
      .with_field("context")
      .execute();
    redis.set(tagsQuery, JSON.stringify(result), "EX", 10);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
