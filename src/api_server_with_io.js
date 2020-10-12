const http = require('http')
const redis = require('redis')
const url = require('url')
const fs = require('fs')
const path = require('path')
const faviconPath = path.join(__dirname, 'favicon.ico')

// connect redis
const redisUrl = 'redis://127.0.0.1:6379/0'
const redisClient = redis.createClient(redisUrl)
redisClient.on('ready', () => {
  console.info('redis client is connected to ' + redisUrl)
})

// http listen
http
  .createServer((req, res) => {
    const u = url.parse(req.url, true)
    console.log('request ' + req.method + ' ' + req.url)
    if (req.method === 'GET' && u.pathname === '/favicon.ico') {
      readStream = fs.createReadStream(faviconPath)
      res.setHeader('Content-Type', 'image/x-icon')
      readStream.pipe(res)
      return
    }

    if (req.method === 'GET' && u.pathname === '/get') {
      redisClient.get('views', function (err, v) {
        if (err) return console.error(err)
        res.end('views is ' + v)
      })
    } else if (req.method === 'GET' && u.pathname === '/set') {
      const n = u.query.no
      redisClient.set('views', n, function (err, v) {
        let msg = ''
        if (err || v !== 'OK') {
          msg = err || 'wrong reply'
          res.end('error happens: ' + msg)
        } else {
          msg = 'views is set to: ' + n
          res.end(msg)
        }
        console.log(msg)
      })
    } else {
      redisClient.incr('views', function (err, v) {
        if (err) return console.error(err)
        res.end('views is ' + v)
      })
    }
  })
  .listen(3000, () => {
    console.log('listening on port 3000')
  })
