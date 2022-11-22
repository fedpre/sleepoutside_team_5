import { loadHeaderFooter } from './utils'
import CheckoutProcess from './checkoutProcess.js'


const subtotalNode = document.querySelector('.subtotal-info')
const formNode = document.querySelector('#ck-form')

const checkoutProcess = new CheckoutProcess('so-cart', subtotalNode)

checkoutProcess.init()

const zip = document.querySelector('#zip')
zip.addEventListener('input', () => {
  checkoutProcess.calculateOrderTotal()
})

formNode.addEventListener('submit', async(event) => {
  await checkoutProcess.checkout(formNode, event)
})

loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)
