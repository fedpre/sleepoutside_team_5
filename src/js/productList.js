import { renderListWithTemplate } from './utils'
export default class ProductList {
  constructor(category, ExternalServices, listElement, sortKey) {
    this.category = category
    this.ExternalServices = ExternalServices
    this.listElement = listElement
    this.products = {}
    this.sortKey = ''
  }
  async init(selector, sortKey) {
    this.sortKey = sortKey
    this.products = await this.ExternalServices.getData(this.category)
    this.sortList(this.sortKey)
    console.log(sortKey)
    this.renderList(this.products, selector, this.listElement, this.category)
  }

  async filterProducts(list, filter) {
    return list.filter(item => filter(item))
  }

  sortList(sortKey) {
    switch (sortKey) {
      case 'name':
        this.products.sort((a, b) =>
          a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
        )
        break
      case 'price':
        this.products.sort((a, b) => {
          if (a.ListPrice >= b.ListPrice) {
            return -1
          } else {
            return 1
          }
        })
        break
    }
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
