import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate
} from './utils'

export default class WishlistData {
  constructor(listElement) {
    this.wishList = []
    this.listElement = listElement
  }

  async init(selector) {
    this.wishList = await this.getWishListContent()
    this.renderCartItems(this.wishList, selector, this.listElement)
  }


  getWishListContent() {
    const wishList = getLocalStorage('so-wishlist')
    if (wishList == null) {
      return []
    }
    return wishList
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
    if (getLocalStorage('so-wishlist') !== null) {
      const items = getLocalStorage('so-cart')
      const newItems = items.filter(item => item.Id !== id)
      setLocalStorage('so-wishlist', newItems)
      window.location.reload()
    }
  }
}
