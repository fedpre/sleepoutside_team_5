import ProductData from './productData'
import { getParams } from './utils'
import ProductDetails from './productDetails'

const productId = getParams('product')
const productData = new ProductData('tents')

const product = new ProductDetails(productId, productData)
product.init()
