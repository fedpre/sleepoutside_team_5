let products = []
function convertToJson(res) {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Bad Response')
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

// get tents data
function getProductsData() {
  fetch('../json/tents.json')
    .then(convertToJson)
    .then(data => {
      products = data
    })
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {
  // Find the product selected among all the products
  const product = products.find(item => item.Id === e.target.dataset.id)
  // Get the current items stores in localStorage
  const localItems = getLocalStorage('so-cart')
  // Check if there are already items there and add the new item
  if (localItems === null) {
    setLocalStorage('so-cart', [product])
  } else {
    setLocalStorage('so-cart', [...localItems, product])
  }
}

getProductsData()
// add listener to Add to Cart button
document.getElementById('addToCart').addEventListener('click', addToCart)
