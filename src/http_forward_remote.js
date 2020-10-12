const http = require('http')
const https = require('https')

http
  .createServer((req, res) => {
    https.get('https://www.google.com', response => {
      response.pipe(res)
    })
    // res.end('hello world')
  })
  .listen(3000)
