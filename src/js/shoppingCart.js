import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate
} from './utils'

export default class ShoppingCart {
  constructor(listElement) {
    this.cartList = []
    this.listElement = listElement
    this.cartTotalValue = 0
  }

  async init(selector, totalEl) {
    this.cartList = await this.getCartContent()
    this.cartTotalValue = this.cartTotal(totalEl)
    this.renderCartItems(this.cartList, selector, this.listElement)
  }

  getCartContent() {
    const cartList = getLocalStorage('so-cart')
    if (cartList == null) {
      return []
    }
    return cartList
  }

  cartTotal(totalEl) {
    if (this.cartList.length === 0) {
      totalEl.innerText = totalEl.innerText + ' $0'
      return 0
    } else {
      totalEl.innerText =
        totalEl.innerText +
        ` $${
          Math.round(
            this.cartList.reduce(
              (acc, curr) => acc + curr.ListPrice * curr.quantity,
              0
            ) * 100
          ) / 100
        }`
    }
  }

  prepareTemplate(node, item) {
    const finalNode = node

    const itemImg = finalNode.querySelector('.prod-img')
    itemImg.src = item.Images.PrimaryMedium
    item.alt = item.Name
    const titleName = finalNode.querySelector('.card__name')
    titleName.innerHTML = item.Name
    const deleteBtn = finalNode.querySelector('.material-symbols-outlined')
    deleteBtn.setAttribute('data-id', item.Id)
    const color = finalNode.querySelector('.cart-card__color')
    color.innerHTML = item.Colors[0].ColorName
    const quantity = finalNode.querySelector('.qt-num')
    quantity.innerHTML = item.quantity
    const addQuantityBtn = finalNode.querySelector('.cart-card__addQuantity')
    addQuantityBtn.setAttribute('data-id', item.Id)
    const removeQuantityBtn = finalNode.querySelector(
      '.cart-card__removeQuantity'
    )
    removeQuantityBtn.setAttribute('data-id', item.Id)
    const finalPrice = finalNode.querySelector('.cart-card__price')
    finalPrice.innerHTML = `$${item.FinalPrice}`

    return finalNode
  }

  renderCartItems(itemList, selector, parentNode) {
    const templateElement = document.querySelector(selector)
    let category
    renderListWithTemplate(
      templateElement,
      parentNode,
      itemList,
      category,
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
