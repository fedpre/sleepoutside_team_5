import { loadHeaderFooter } from './utils'
import CheckoutProcess from './checkoutProcess.js'


const subtotalNode = document.querySelector('.subtotal-info')

console.log(subtotalNode.querySelector('.tax-amount'))

const checkoutProcess = new CheckoutProcess('so-cart', subtotalNode)

checkoutProcess.init()

const zip = document.querySelector('#zip')
zip.addEventListener('input', () => {
  checkoutProcess.calculateOrderTotal()
})


loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)
