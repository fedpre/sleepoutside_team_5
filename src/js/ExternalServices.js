const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
const postOrderURL = 'http://server-nodejs.cit.byui.edu:3000/checkout'
const loginURL = 'http://server-nodejs.cit.byui.edu:3000/login'
const registerURL = 'http://server-nodejs.cit.byui.edu:3000/users'
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

  async getData(category) {
    const res = await fetch(baseURL + `products/search/${category}`)
    const data = await convertToJson(res)
    return data.Result
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

  async registerRequest(data) {
    let req = new Request(registerURL, {
      body: JSON.stringify(data),
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
