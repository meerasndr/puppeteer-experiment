//const puppeteer = require('puppeteer');
//const axios = require('axios');
import puppeteer from "puppeteer";
import axios from "axios";

declare global{
  interface Window{
    puppeteerMutationListener: any
  }
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5500');
  await page.exposeFunction('puppeteerMutationListener', (oldPrice, newPrice) => {
  const mutation = 
    axios({                                                
      url: 'https://ice-buddha.herokuapp.com/v1/graphql', 
      method: 'post',
      data: { query:
        `mutation insert_choco($objects: [chocolates_insert_input!]!){
          insert_chocolates(objects: $objects){
            returning{
              name
            }
          }
        }`, 
      variables: {"objects": {"name": `${newPrice}`}}
  }
  }).then((result) => {
      console.log(JSON.stringify(result.data))
  });
  console.log(`${oldPrice} -> ${newPrice}`)

})

await page.$eval('#price', () => {
  {
    const target = document.querySelector('#price') as HTMLLabelElement
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
})();
