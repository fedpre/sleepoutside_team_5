import Alert from './alert'
import ProductData from './productData'
import ProductList from './productList'
import { loadHeaderFooter } from './utils'

const parentNode = document.querySelector('.product-list')
const selector = '#product-card-template'
const productData = new ProductData('tents')
const productList = new ProductList('tents', productData, parentNode)


loadHeaderFooter('./partials/header.html', './partials/footer.html', true)

const alerts = new Alert()
alerts.init()


productList.init(selector)
