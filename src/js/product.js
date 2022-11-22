import ExternalServices from './ExternalServices'
import { getParams } from './utils'
import ProductDetails from './productDetails'

const productId = getParams('product')
const category = getParams('category')
const externalServices = new ExternalServices()

const product = new ProductDetails(productId, externalServices, category)
product.init()
