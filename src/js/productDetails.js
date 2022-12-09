import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils'

export default class ProductDetails {
  constructor(productId, ExternalServices, category) {
    this.productId = productId
    this.product = {}
    this.ExternalServices = ExternalServices
    this.category = category
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.ExternalServices.findProductById(
      this.productId,
      this.category
    )
    // once we have the product details we can render out the HTML
    this.renderProductDetails()
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this))
    document
      .getElementById('addToWishlist')
      .addEventListener('click', this.addToWishlist.bind(this))
    }
  getName() {
    return this.product.Name
  }

  async addToCart() {
    // Get the current items stores in localStorage
    let localItems = getLocalStorage('so-cart')
    // Check if there are already items there and add the new item
    if (localItems === null || localItems.length === 0) {
      setLocalStorage('so-cart', [{ ...this.product, quantity: 1 }])
      return
    }
    const addItemsArray = localItems.map(item =>
      item.Id === this.product.Id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    let check = localItems.find(i => i.Id === this.product.Id)

    if (check !== undefined) {
      setLocalStorage('so-cart', addItemsArray)
    } else {
      setLocalStorage('so-cart', [
        ...localItems,
        { ...this.product, quantity: 1 }
      ])
    }
  }

  async addToWishlist() {
    // Get the current items stores in localStorage
    let localItems = getLocalStorage('so-wishlist')
    // Check if there are already items there and add the new item
    if (localItems === null || localItems.length === 0) {
      setLocalStorage('so-wishlist', [{...this.product, category: this.category}])
      return
    }
    // const addItemsArray = localItems.map(item =>
    //   item.Id === this.product.Id
    //     ? { ...item, quantity: item.quantity + 1 }
    //     : item
    // )
    let check = localItems.find(i => i.Id === this.product.Id)

    if (check !== undefined) {
      setLocalStorage('so-wishlist', localItems)
    } else {
      setLocalStorage('so-wishlist', [
        ...localItems,
        { ...this.product, category: this.category }
      ])
    }
  }

  renderProductDetails() {
    let newProduct = `<h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.Name}</h2>
        <div class="image-carousel">`
    if (this.product.Images.ExtraImages) {
      this.product.Images.ExtraImages.map(extra => {
        newProduct += `<img class="alt-img" src="${extra.Src}" alt="${extra.Title}"/> `
      })
    }
    
    newProduct += `
        </div>
        <img
          class="divider prodImg"
          src=${this.product.Images.PrimaryLarge}
          alt=${this.product.Name}
        />
        <p class="product-card__price">$${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <div class="product__colorPicker">`
    if (this.product.Colors) {
      this.product.Colors.map(color => {
        newProduct += `<img class="color-picker-img" src="${color.ColorPreviewImageSrc}" data-name="${color.ColorName}" />`
      })
    }

    newProduct += `</div><p class="product__description">${this.product.DescriptionHtmlSimple}</p>
                          <div class="product-detail__add add">
                          <button class="btn-primary" id="addToCart" data-id=${this.product.Id}>Add to Cart</button>
                          <button class="btn-primary-red" id="addToWishlist" data-id=${this.product.Id}>Add to Wishlist</button>
                          </div>`
    document.querySelector('.product-detail').innerHTML = newProduct
    document.querySelector(
      'title'
    ).innerHTML = `Sleep Outside | ${this.product.Name}`

    const colorPickersBtn = document.querySelectorAll('.color-picker-img')
    colorPickersBtn.forEach(el => {
      el.addEventListener('click', () => {
        const lgImage = document.querySelector('.prodImg')
        lgImage.src = el.src
        const colorName = document.querySelector('.product__color')
        colorName.innerHTML = el.dataset.name
      })
    })

    const altImages = document.querySelectorAll('.alt-img')
    altImages.forEach(img => {
      img.addEventListener('click', () => {
        const lgImage = document.querySelector('.prodImg')
        lgImage.src = img.src
      })
    })
  }
}

loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)
