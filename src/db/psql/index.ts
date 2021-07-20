import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import { User } from "../../entity/users";
import { Merchant } from "../../entity/merchants";
import { Transaction } from "../../entity/tx";

export let db: Connection;

/**
 * @param  {string} url_master
 * @param  {string[]} ...url_salve
 */
export function initlizeDb(url_master: string, ...url_salve: string[]) {
  let slaves_list: any[] = []
  for(let item of url_salve) {
    slaves_list.push({ url: item })
  }
  createConnection({
    type: "postgres",
    /*
    |
    | Streaming replication allows a standby server to stay more up-to-date
    | than is possible with file-based log shipping. The standby connects to
    | the primary, which streams WAL records to the standby as they're generated,
    | without waiting for the WAL file to be filled.
    | Streaming replication is asynchronous by default, in which
    | case there is a small delay between committing a transaction in the primary and 
    | the changes becoming visible in the standby. This delay is however much smaller
    | than with file-based log shipping, typically under one second assuming the standby
    | is powerful enough to keep up with the load. With streaming replication, archive_timeout
    | is not required to reduce the data loss window.
    |
    | ref:https://www.postgresql.org/docs/9.4/warm-standby.html#STREAMING-REPLICATION
    |
    */
    replication: {
      master: { url: url_master },
      slaves: slaves_list
    },
    entities: [ User, Transaction, Merchant ],
    synchronize: true,
    logging: false
  }).then(async connection => {
      db = connection
      await connection.synchronize();
      console.log('=== Database connected ===')
  }).catch(error => {
    console.log(error)
    process.exit(1);
  });
}
