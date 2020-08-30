const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8001');
  page.exposeFunction('puppeteerMutationListener', puppeteerMutationListener);
await page.$eval('#price', label => {
  {
    const target = document.querySelector('#price')
    const observer = new MutationObserver((mutationsList) => {
      for(const textmutation of mutationsList){
        window.puppeteerMutationListener(
          textmutation.removedNodes[0].textContent,
          textmutation.addedNodes[0].textContent
        )    
      }
    })
    observer.observe(
      target,
      { childList: true }
    ) 
  }
})

await browser.close()

})();

function puppeteerMutationListener(oldPrice, newPrice) {
  console.log(`${oldPrice} ~ ${newPrice}`)
  
}