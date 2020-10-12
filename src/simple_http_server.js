require('http')
  .createServer((req, res) => res.end('hello china'))
  .listen(3000, function () {
    console.log('listening on 3000')
  })
