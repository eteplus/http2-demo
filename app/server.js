const spdy = require('spdy')
const http = require('http')
const fs = require('fs')

const port = 8080
const port2 = 8081

const server = require('./app')

const router = require('./router')

server.use(router.routes())
  .use(router.allowedMethods())

const options = {
  key: fs.readFileSync(__dirname + '/keys/private.pem'),
  cert: fs.readFileSync(__dirname + '/keys/server.crt')
}
const http2server = spdy.createServer(options, server.callback())

server.listen(port)
http2server.listen(port2)

console.log('Http listen on: http://localhost:' + port + '')
console.log('Https listen on: https://localhost:' + port2 + '')
