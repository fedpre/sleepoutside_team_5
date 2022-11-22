import { getLocalStorage } from './utils'

function calculateShipping(noItems) {
  if (noItems === 1) {
    return 10
  }
  return 10 + (noItems - 1) * 2
}

function calculateTaxes(amount, tax) {
  return amount * tax
}

export function calculateSubtotal(nodeCount, nodeAmount) {
  const cartItems = getLocalStorage('so-cart')
  if (cartItems.length === 0) {
    nodeCount.innerText = 0
    nodeAmount.innerText = '$0'
  }
  const count = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
  const amount =
    Math.round(cartItems.reduce((acc, curr) => acc + curr.ListPrice, 0) * 100) /
    100
  nodeCount.innerText = count
  nodeAmount.innerText = `$${amount}`
}

export function calculateOrderTotal(nodeShipping, nodeTax, nodeTotal) {
  const cartItems = getLocalStorage('so-cart')
  if (cartItems.length === 0) {
    nodeShipping.innerText = '$0'
    nodeTax.innerText = '$0'
    nodeTotal.innerText = '$0'
  }
  const noItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
  const shippingCost = calculateShipping(noItems)
  const amount =
    Math.round(cartItems.reduce((acc, curr) => acc + curr.ListPrice, 0) * 100) /
    100
  const taxAmount = calculateTaxes(amount, 0.06)
  nodeShipping.innerText = `$${shippingCost}`
  nodeTax.innerText = `$${Math.round(taxAmount * 100) / 100}`
  nodeTotal.innerText = `$${
    Math.round((shippingCost + amount + taxAmount) * 100) / 100
  }`
}
