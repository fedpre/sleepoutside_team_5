const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'

function convertToJson(res) {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Bad Response')
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
}
