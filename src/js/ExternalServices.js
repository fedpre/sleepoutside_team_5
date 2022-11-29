const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
const postOrderURL = 'http://server-nodejs.cit.byui.edu:3000/checkout'
const loginURL = 'http://server-nodejs.cit.byui.edu:3000/login'
const orderURL = 'http://server-nodejs.cit.byui.edu:3000/orders'

async function convertToJson(res) {
  const jsonRes = await res.json()
  if (res.ok) {
    return jsonRes
  } else {
    throw { name: 'serviceError', message: jsonRes }
  }
}

// export function filterProducts(productsArray, event) {}

export default class ExternalServices {
  constructor() {}

  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then(data => data.Result)
  }

  async findProductById(productId, category) {
    const products = await this.getData(category)
    return products.find(item => item.Id === productId)
  }

  async checkout(order) {
    let req = new Request(postOrderURL, {
      body: order,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let res = await fetch(req)
    return convertToJson(res)
  }
 
  async loginRequest(creds) {
    let req = new Request(loginURL, {
      body: JSON.stringify(creds),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res = await fetch(req)
    return convertToJson(res)
  }

  async getOrders(authToken) {
    let req = new Request(orderURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    const res = await fetch(req)
    return convertToJson(res)
  }

}
