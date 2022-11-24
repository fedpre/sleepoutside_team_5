import ExternalServices from './ExternalServices'
import { getParams } from './utils'
import ProductDetails from './productDetails'

const productId = getParams('product')
const category = getParams('category')
const externalServices = new ExternalServices()
const parentNodeBreadcrumb = document.querySelector('.breadcrumb')
const product = new ProductDetails(productId, externalServices, category)
product.init().then(() => {
  ;(function createBreadcrumb() {
    const prodCatNode = document.createElement('span')
    prodCatNode.innerText = `${category} >> `
    parentNodeBreadcrumb.appendChild(prodCatNode)
    const itemName = document.createElement('span')
    itemName.innerText = product.getName()
    parentNodeBreadcrumb.appendChild(itemName)
  })()
})
