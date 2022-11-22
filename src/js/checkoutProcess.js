import ExternalServices from './ExternalServices'
import { getLocalStorage, alertMessage } from './utils'

const externalServices = new ExternalServices()

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.ListPrice,
    quantity: item.quantity
  }))
}

function convertFD2JSON(formData) {
  let obj = {}
  for (let key of formData.keys()) {
    obj[key] = formData.get(key)
  }
  return JSON.stringify(obj)
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key
    this.outputSelector = outputSelector
    this.list = []
    this.itemCount = 0
    this.itemTotal = 0
    this.shipping = 0
    this.tax = 0
    this.orderTotal = 0
  }
  init() {
    this.list = getLocalStorage(this.key)
    this.calculateItemSummary()
  }
  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemCount = this.list.reduce((acc, curr) => acc + curr.quantity, 0)
    this.itemTotal =
      Math.round(
        this.list.reduce(
          (acc, curr) => acc + curr.ListPrice * curr.quantity,
          0
        ) * 100
      ) / 100
    this.outputSelector.querySelector(
      '.item-subtotal'
    ).innerText = this.itemCount
    this.outputSelector.querySelector(
      '.subtotal-value'
    ).innerText = `$${this.itemTotal}`
  }
  calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = this.calculateShipping(this.itemCount)
    this.tax = Math.round(this.calculateTaxes(this.itemTotal, 0.06) * 100) / 100
    // display the totals.
    this.displayOrderTotals()
  }
  displayOrderTotals() {
    this.orderTotal =
      Math.round((this.itemTotal + this.shipping + this.tax) * 100) / 100
    // once the totals are all calculated display them in the order summary page

    this.outputSelector.querySelector(
      '.shipping-amount'
    ).innerText = `$${this.shipping}`
    this.outputSelector.querySelector('.tax-amount').innerText = `$${this.tax}`
    this.outputSelector.querySelector(
      '.order-total'
    ).innerText = `$${this.orderTotal}`
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

  async checkout(form, event) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    event.preventDefault()
    const items = packageItems(this.list)
    let fd = new FormData(form)
    fd.append('items', items)
    fd.append('orderDate', new Date())
    fd.append('orderTotal', this.itemTotal)
    fd.append('shipping', this.shipping)
    fd.append('tax', this.tax.toString)
    // for(let key of fd.keys()) {
    //   console.log(key, fd.get(key))
    // }

    // call the checkout method in our ExternalServices module and send it our data object.
    const jsonData = convertFD2JSON(fd)
    try {
      const res = await externalServices.checkout(jsonData)
      localStorage.clear()
      window.location.href = './checkedout.html'
    } catch (err) {
      console.error(err)
      alertMessage(err.message)
    }
  }
}
