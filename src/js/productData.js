function convertToJson(res) {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Bad Response')
  }
}

export function filterProducts(productsArray, event) {}

export default class ProductData {
  constructor(category) {
    this.category = category
    this.path = `../json/${this.category}.json`
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then(data => data)
  }

  async findProductById(productId) {
    const products = await this.getData()
    return products.find(item => item.Id === productId)
  }
}
