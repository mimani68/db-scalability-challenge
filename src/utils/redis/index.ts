import { promisify } from "util";
import redis from "redis";

import config from "../../config";

const client = redis.createClient({
  url: config.REDIS_URL,
});

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set);
export const expireatAsync = promisify(client.expireat).bind(client);