
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: false})

    const page1 = await browser.newPage()
    await page1.goto('https://booking.com')
    await page1.type('#ss', 'Berlin')
    await page1.click('.sb-searchbox__button')
    const cookies1 = await page1.cookies()
    const cookieJson1 = JSON.stringify(cookies1)
  
    fs.writeFileSync('cookies1.json', cookieJson1)
    
    const page2 = await browser.newPage()
    await page2.goto('https://booking.com')
    await page2.type('#ss', 'Hamburg')
    await page2.click('.sb-searchbox__button')
    const cookies2 = await page2.cookies()
    const cookieJson2 = JSON.stringify(cookies2)

    fs.writeFileSync('cookies2.json', cookieJson2)
    
    
  
    await browser.close();



})();