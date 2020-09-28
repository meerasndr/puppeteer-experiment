import puppeteer from 'puppeteer';
jest.setTimeout(30000)
test("Check for broken images in webpage", async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    //await page.goto("https://the-internet.herokuapp.com/broken_images")
    await page.goto("https://reddit.com")
    const sel = 'img'
    const imgWidthArray = await page.evaluate((sel) => {
       let elements = Array.from(document.querySelectorAll(sel))
       let width = elements.map(element => {
           return element.naturalWidth
       })
       return width
    }, sel);

    await imgWidthArray.forEach(img => {
        expect(img).toBeGreaterThan(0)
    });
})
