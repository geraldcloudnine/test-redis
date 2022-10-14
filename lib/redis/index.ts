import Redis from "ioredis";

const API = process.env.NEXT_PUBLIC_REDIS_URL || "";

const redis = new Redis(API);

export default redis;
