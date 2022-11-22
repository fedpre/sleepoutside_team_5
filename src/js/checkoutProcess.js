import { getLocalStorage } from './utils'

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemCount = 0;
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemCount = this.list.reduce((acc, curr) => acc + curr.quantity, 0)
    this.itemTotal = Math.round(this.list.reduce((acc, curr) => acc + curr.ListPrice, 0) * 100) / 100
    this.outputSelector.querySelector('.item-subtotal').innerText = this.itemCount
    this.outputSelector.querySelector('.subtotal-value').innerText = this.itemTotal
  }
  calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = this.calculateShipping(this.itemCount)
    this.tax = Math.round(this.calculateTaxes(this.itemTotal, 0.06) * 100) / 100
    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    this.orderTotal = Math.round((this.itemTotal + this.shipping + this.tax) * 100) / 100
    // once the totals are all calculated display them in the order summary page

    this.outputSelector.querySelector('.shipping-amount').innerText = `$${this.shipping}`
    this.outputSelector.querySelector('.tax-amount').innerText = `$${this.tax}`
    this.outputSelector.querySelector('.order-total').innerText = `$${this.orderTotal}`
  }

  calculateShipping(noItems) {
    if (noItems === 1) {
      return 10
    }
    return 10 + (noItems - 1) * 2
  }
  
  calculateTaxes(amount, tax) {
    return amount * tax
  }
}