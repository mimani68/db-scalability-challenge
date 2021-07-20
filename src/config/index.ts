import { resolve } from 'path'

export default {
  ADDRESS: process.env.URL || '0.0.0.0:5000',
  PROTO_PATH: resolve(process.cwd() + '/protos/route_guide.proto'),
  DB_MASTER_CONNECTION_URL: process.env.DB_MASTER_CONNECTION_URL || '',
  DB_SLAVE_ONE_CONNECTION_URL: process.env.DB_SLAVE_ONE_CONNECTION_URL || '' ,
  DB_SLAVE_TWO_CONNECTION_URL: process.env.DB_SLAVE_TWO_CONNECTION_URL || '',
  DB_SLAVE_THREE_CONNECTION_URL: process.env.DB_SLAVE_THREE_CONNECTION_URL || '',
  EXPIRE_CACHE_AFTER_MS: 60 * 1000
}