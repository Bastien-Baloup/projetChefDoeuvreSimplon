const http = require('http')
var fs = require('fs')
var https = require('https')
const app = require('./app')

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: 3030'
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
    default:
      throw error
  }
}

const server = http.createServer(app)

const serverHttps = https.createServer({ key: fs.readFileSync('./server.key'), cert: fs.readFileSync('server.cert') }, app)
  .listen(3080, () => {
    const address = serverHttps.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port 3080'
    console.log('HTTPS listening on ' + bind)
  }).on('error', errorHandler)

server.on('error', errorHandler)
server.listen(3030, () => {
  const address = serverHttps.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port 3030'
  console.log('HTTP listening on ' + bind)
})
