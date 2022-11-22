import ProductData from './productData'
import ProductList from './productList'
import { loadHeaderFooter, getParams } from './utils'

loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)

// Create a dynamic title
const category = getParams('category')
let title = document.querySelector('#product-type')
title.innerHTML = title.textContent + ` ${category}`

// Create the product list
const parentNode = document.querySelector('.product-list')
const selector = '#product-card-template'
let sortKey = document.querySelector('#sort').value
const productData = new ProductData()
const productList = new ProductList(category, productData, parentNode)
productList.init(selector, sortKey)

document.querySelector('#sort').addEventListener('change', e => {
  sortKey = e.target.value
  productList.init(selector, sortKey)
})


document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault()
  const value = document.querySelector('#query').value
  productList.searchProduct(value)
})
