import { getLocalStorage, setLocalStorage } from './utils'

export default class ProductDetails {
  constructor(productId, productData) {
    this.productId = productId
    this.product = {}
    this.productData = productData
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.productData.findProductById(this.productId)
    // once we have the product details we can render out the HTML
    this.renderProductDetails()
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this))
  }

  async addToCart() {
    // Get the current items stores in localStorage
    const localItems = getLocalStorage('so-cart')
    // Check if there are already items there and add the new item
    if (localItems === null) {
      setLocalStorage('so-cart', [this.product])
    } else {
      setLocalStorage('so-cart', [...localItems, this.product])
    }
  }

  renderProductDetails() {
    const newProduct = `<h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.Name}</h2>
        <img
          class="divider"
          src=${this.product.Image}
          alt=${this.product.Name}
        />
        <p class="product-card__price">${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id=${this.product.Id}>Add to Cart</button>
        </div>`

    document.querySelector('.product-detail').innerHTML = newProduct
    document.querySelector(
      'title'
    ).innerHTML = `Sleep Outside | ${this.product.Name}`
  }
}
