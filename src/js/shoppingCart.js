import {
  getLocalStorage,
  renderListWithTemplate,
  setLocalStorage
} from './utils'

export default class ShoppingCart {
  constructor(category, productData, listElement) {
    this.category = category
    this.productData = productData
    this.listElement = listElement
    this.products = {}
  }
  async init(selector) {
    this.renderList(this.products, selector, this.listElement)
  }

  getCartContents() {
    const cartItem = getLocalStorage('so-cart')
    if (cartItem == null) {
      return
    }
    const renderItems = cartItem.map(item => this.renderList(item))

    document.querySelector('.product-list').innerHTML = renderItems.join('')
  }

  async filterProducts(list, filter) {
    return list.filter(item => filter(item))
  }

  prepareTemplate(node, item) {}

  renderList(productList, selector, parentNode) {
    const templateElement = document.querySelector(selector)
    renderListWithTemplate(
      templateElement,
      parentNode,
      productList,
      this.prepareTemplate
    )
  }

  removeItem(e) {
    e.preventDefault()
    const id = e.target.dataset.id
    if (getLocalStorage('so-cart') !== null) {
      const items = getLocalStorage('so-cart')
      const newItems = items.filter(item => item.Id !== id)
      setLocalStorage('so-cart', newItems)
      window.location.reload()
    }
  }

  addQuantity(e) {
    const id = e.target.dataset.id
    const currItems = getLocalStorage('so-cart')
    const addItemsArray = currItems.map(item =>
      item.Id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setLocalStorage('so-cart', addItemsArray)
    window.location.reload()
  }

  removeQuantity(e) {
    const id = e.target.dataset.id
    const currItems = getLocalStorage('so-cart')
    const addItemsArray = currItems.map(item =>
      item.Id === id ? { ...item, quantity: item.quantity - 1 } : item
    )
    setLocalStorage('so-cart', addItemsArray)
    window.location.reload()
  }
}
