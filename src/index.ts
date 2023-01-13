require('dotenv').config()
import http from  'http'
import { controller } from './controller'

const server = http.createServer(controller)
server.listen(process.env.PORT)
