// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await cloudinary.search
      .expression("tags=adios AND tags=hola")
      .with_field("tags")
      .with_field("context")
      .execute();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
