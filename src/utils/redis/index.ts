import { promisify } from "util";
import redis from "redis";

import config from "../../config";

export const client = redis.createClient({
  url: config.REDIS_URL,
});

export default {
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set),
  expireatAsync: promisify(client.expireat).bind(client)
}