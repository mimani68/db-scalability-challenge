import "reflect-metadata";
import { createConnection } from "typeorm";
import { resolve } from "path";

/**
 * @param  {string} url_master
 * @param  {string[]} ...url_salve
 */
export function initlizeDb(url_master: string, ...url_salve: string[]) {
  let slaves_list = []
  for(let item of url_salve) {
    slaves_list.push({ url: item })
  }
  createConnection({
    type: "postgres",
    replication: {
      master: { url: url_master },
      slaves: slaves_list
    },
    entities: [
      resolve( process.cwd() + "/../../entity/*.js")
    ],
    synchronize: true,
    logging: false
  }).then(connection => {
      console.log('Database connected')
  }).catch(error => {
    console.log(error)
    process.exit(1);
  });
}
