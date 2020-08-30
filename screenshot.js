const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://wikipedia.org');
    await page.screenshot({path: 'wikihome.png'});
    await browser.close()
})();

