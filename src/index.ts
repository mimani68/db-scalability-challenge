import {
  Server,
  ServerCredentials,
  loadPackageDefinition
} from '@grpc/grpc-js';
import {
  loadSync
} from '@grpc/proto-loader';

import config from "./config";
import {
  getUserDetails
} from './route'


/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
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
  let routeguide = loadPackageDefinition(packageDefinition).routeguide;

  let server = new Server();
  server.addService(routeguide.RouteGuide.service, {
    getUserDetails: getUserDetails
  });
  return server;
}

if (require.main === module) {
  let routeServer = getServer();
  routeServer.bindAsync(config.ADDRESS, ServerCredentials.createInsecure(), () => {
    // let argv = parseArgs(process.argv, {
    //   string: 'db_path'
    // });
    // fs.readFile(path.resolve(argv.db_path), function (err, data) {
    //   if (err) throw err;
    //   feature_list = JSON.parse(data);
    //   routeServer.start();
    // });
    routeServer.start();
  });
}