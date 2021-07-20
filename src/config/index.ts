import { resolve } from 'path'

export default {
  ADDRESS: process.env.URL || '0.0.0.0:5000',
  PROTO_PATH: resolve(process.cwd() + '/protos/route_guide.proto'),
  DB_TYPE: "postgres",
  DB_HOST: "localhost",
  DB_PORT: 3306,
  DB_USERNAME: "root",
  DB_PASSWORD: "admin",
  DB_DATABASE: "test",
}