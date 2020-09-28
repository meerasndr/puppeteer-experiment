import * as playwright from "playwright";

(async () => {
    const { chromium , firefox, webkit } = playwright
  for (const browserType of [chromium, firefox, webkit]) {
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `example-${browserType.name()}.png` });
    await browser.close();
  }
})();