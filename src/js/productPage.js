// data_id of button
console.log()
// price, product, description, image
import { getLocalStorage } from './utils.js'
//build array
let productsArray = []
function convertToJson(res) {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Bad Response')
  }
}
function getProductsData() {
  fetch('../json/tents.json')
    .then(convertToJson)
    .then(data => {
      productsArray = data
      renderProductPage()
    })
}

function renderProductPage() {
  const id = getLocalStorage('currPageId')
  const product = productsArray.find(item => item.Id === id)
  const newProduct = `<h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.Name}</h2>
        <img
          class="divider"
          src=${product.Image}
          alt=${product.Name}
        />

        <p class="product-card__price">${product.ListPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
        </div>`

  document.querySelector('.product-detail').innerHTML = newProduct
  document.querySelector('title').innerHTML = `Sleep Outside | ${product.Name}`
  return newProduct
}

getProductsData()

getLocalStorage('currPageId')
