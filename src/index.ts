import {
  Server,
  ServerCredentials,
  loadPackageDefinition
} from '@grpc/grpc-js';
import {
  loadSync
} from '@grpc/proto-loader';
import {
  yellowBright,
  greenBright
} from 'chalk';

import config from './config';
import {
  initlizeDb
} from './db/psql';
import {
  merchantList
} from './route/merchant.router';


/**
 * @return {Server} The new server object
 */
export function getServer() {
  let packageDefinition = loadSync(
    config.PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
  let routeguide: any = loadPackageDefinition(packageDefinition).routeguide;

  let server = new Server();
  server.addService(routeguide.MerchantService.service, {
    merchantList
  });
  return server;
}

if (require.main === module) {
  let routeServer = getServer();
  routeServer.bindAsync(config.ADDRESS, ServerCredentials.createInsecure(), (err: any) => {
    if (err) {
      console.error(err)
      throw new Error(err)
    }
    routeServer.start();
    initlizeDb(
      config.DB_MASTER_CONNECTION_URL,
      config.DB_SLAVE_ONE_CONNECTION_URL,
      config.DB_SLAVE_TWO_CONNECTION_URL,
      config.DB_SLAVE_THREE_CONNECTION_URL
    );
    console.log(`
-------------------------------------------------------
  ${ greenBright(process.env.npm_package_name)}: v${ process.env.npm_package_version }
  Server start on address ${ yellowBright(config.ADDRESS) }
-------------------------------------------------------
    `);
  })
}