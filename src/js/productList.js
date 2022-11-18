import { renderListWithTemplate } from './utils'
export default class ProductList {
  constructor(category, productData, listElement) {
    this.category = category
    this.productData = productData
    this.listElement = listElement
    this.products = {}
    // this.acceptedItems = ['880RR', '985RF', '985PR', '344YJ']
  }
  async init(selector) {
    // this.products = await this.getAllProducts(item =>
    //   this.acceptedItems.includes(item.Id)
    // )
    this.products = await this.productData.getData(this.category)
    this.renderList(this.products, selector, this.listElement, this.category)
  }

  // async getAllProducts(filterCallback = null) {
  // if (filterCallback !== null) {
  //   const products = await this.productData.getData(
  //     this.category,
  //    filterCallback
  //   )
  //   return this.filterProducts(products, filterCallback)
  //  }
  // const list = await this.productData.getData(this.category)
  // return list
  // }

  async filterProducts(list, filter) {
    return list.filter(item => filter(item))
  }

  prepareTemplate(node, product, category) {
    const finalNode = node
    const a = finalNode.querySelector('a')
    const img = finalNode.querySelector('img')
    const brand = finalNode.querySelector('.card__brand')
    const name = finalNode.querySelector('.card__name')
    const price = finalNode.querySelector('.product-card__price')

    a.href = a.href + product.Id + `&category=${category}`
    img.src = product.Images.PrimarySmall
    img.alt = product.Name
    brand.textContent = product.Name
    name.textContent = product.NameWithoutBrand
    price.textContent = price.textContent + product.ListPrice
    return finalNode
  }

  renderList(productList, selector, parentNode, category) {
    const templateElement = document.querySelector(selector)
    renderListWithTemplate(
      templateElement,
      parentNode,
      productList,
      category,
      this.prepareTemplate
    )
  }
}
