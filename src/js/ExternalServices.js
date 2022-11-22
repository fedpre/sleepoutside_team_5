const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'
const postOrderURL = 'http://server-nodejs.cit.byui.edu:3000/checkout'

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
}
