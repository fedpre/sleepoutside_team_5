import { loadHeaderFooter } from './utils'
import { calculateSubtotal, calculateOrderTotal } from './checkoutProcess.js'

const subtotalCount = document.querySelector('.item-subtotal')
const subtotalAmount = document.querySelector('.subtotal-value')
const shippingAmount = document.querySelector('.shipping-amount')
const taxAmount = document.querySelector('.tax-amount')
const orderTotal = document.querySelector('.order-total')
const zip = document.querySelector('#zip')

zip.addEventListener('input', () => {
  calculateOrderTotal(shippingAmount, taxAmount, orderTotal)
})

calculateSubtotal(subtotalCount, subtotalAmount)

loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)
