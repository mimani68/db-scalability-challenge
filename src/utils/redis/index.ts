import redis from "redis";
import { promisify } from "util";

const client = redis.createClient();

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set);
export const expireatAsync = promisify(client.expireat).bind(client);