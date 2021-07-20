import { resolve } from 'path'

export default {
  ADDRESS: process.env.URL || '0.0.0.0:5000',
  PROTO_PATH: resolve(process.cwd() + '/protos/route_guide.proto')
}