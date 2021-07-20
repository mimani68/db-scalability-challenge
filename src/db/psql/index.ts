import "reflect-metadata";
import { createConnection } from "typeorm";
import { resolve } from "path";

import config from "../../config";

export function initlizeDb() {
  createConnection({
    type: "postgres",
    host: config.DB_HOST,
    port: +config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    entities: [
      resolve( process.cwd() + "/../../entity/*.js")
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log('Database connected')
}).catch(error => console.log(error));
}
