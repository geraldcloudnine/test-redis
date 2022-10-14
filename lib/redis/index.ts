import Redis from "ioredis";

const API = process.env.NEXT_PUBLIC_REDIS_URL || "";
const TOKEN = process.env.NEXT_PUBLIC_REDIS_TOKEN || "";

const redis = new Redis(
  "rediss://:572b262a80824e568ebb659de712fb9e@eu2-loved-rabbit-31021.upstash.io:31021"
);

export default redis;
