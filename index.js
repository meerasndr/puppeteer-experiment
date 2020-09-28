const priceLabel = document.getElementById("price")
setInterval(() => {
    const randomPrice = Math.floor(2000 * Math.random())
    priceLabel.innerHTML = randomPrice
}, 5000);

