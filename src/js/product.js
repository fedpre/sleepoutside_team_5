import ProductData from './productData'
import { getParams } from './utils'
import ProductDetails from './productDetails'

const productId = getParams('product')
const category = getParams('category')
const productData = new ProductData()

const product = new ProductDetails(productId, productData, category)
product.init()
