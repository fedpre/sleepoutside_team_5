import { renderListWithTemplate } from './utils'
export default class ProductList {
  constructor(category, productData, listElement) {
    this.category = category
    this.productData = productData
    this.listElement = listElement
    this.products = {}
    this.acceptedItems = ['880RR', '985RF', '985PR', '344YJ']
  }
  async init(selector) {
    this.products = await this.getAllProducts(item =>
      this.acceptedItems.includes(item.Id)
    )
    this.renderList(this.products, selector, this.listElement)
  }

  async getAllProducts(filterCallback = null) {
    if (filterCallback !== null) {
      const products = await this.productData.getData(filterCallback)
      return this.filterProducts(products, filterCallback)
    }
    return await this.productData.getData()
  }

  async filterProducts(list, filter) {
    return list.filter(item => filter(item))
  }

  prepareTemplate(node, product) {
    const finalNode = node
    const a = finalNode.querySelector('a')
    const img = finalNode.querySelector('img')
    const brand = finalNode.querySelector('.card__brand')
    const name = finalNode.querySelector('.card__name')
    const price = finalNode.querySelector('.product-card__price')

    a.href = a.href + product.Id
    img.src = product.Image
    img.alt = product.Name
    brand.textContent = product.Name
    name.textContent = product.NameWithoutBrand
    price.textContent = price.textContent + product.ListPrice
    return finalNode
  }

  renderList(productList, selector, parentNode) {
    const templateElement = document.querySelector(selector)
    renderListWithTemplate(
      templateElement,
      parentNode,
      productList,
      this.prepareTemplate
    )
  }
}
