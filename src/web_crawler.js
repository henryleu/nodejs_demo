const puppeteer = require('puppeteer')
const path = require('path')
const cheerio = require('cheerio')

const main = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://www.baidu.com')
    const ts = '' + new Date().getTime()
    const file = 'screenshot-' + ts.substring(5) + '.jpg'
    const outPath = path.join(__dirname, 'out', file)
    await page.screenshot({ path: outPath })
    cheerio.load(page.content)

    await browser.close()
  } catch (e) {
    console.error(e)
  }
}

main()
