import Alert from './alert'
import ProductData from './productData'
import ProductList from './productList'

const parentNode = document.querySelector('.product-list')
const selector = '#product-card-template'
const productData = new ProductData('tents')
const productList = new ProductList('tents', productData, parentNode)

const alerts = new Alert()
alerts.init()

productList.init(selector)
