const areas = require('./area_code_2020').data
const url = require('url')
const fs = require('fs')
const path = require('path')
const faviconPath = path.join(__dirname, 'favicon.ico')

const provinces = {}
for (const a of areas) {
  if (a['level'] !== 1) {
    continue
  }
  provinces[a['code']] = a
}

require('http')
  .createServer((req, res) => {
    const u = url.parse(req.url, true)
    console.log('request ' + req.method + ' ' + req.url)
    if (req.method === 'GET' && u.pathname === '/favicon.ico') {
      readStream = fs.createReadStream(faviconPath)
      res.setHeader('Content-Type', 'image/x-icon')
      readStream.pipe(res)
      return
    }

    if (req.method === 'GET' && u.pathname === '/area') {
      const code = u.query.code
      if (!code) {
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({ errCode: 'invalid api request' }))
        res.end()
        return
      }
      const item = provinces[code]
      res.setHeader('Content-Type', 'application/json')
      if (!item) {
        res.end(JSON.stringify({ errCode: 'invalid area code' }))
      } else {
        res.end(JSON.stringify({ result: item }))
      }
    } else {
      res.end(JSON.stringify({ errCode: 'api not found' }))
    }
  })
  .listen(3000)
