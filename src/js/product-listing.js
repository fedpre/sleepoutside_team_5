import ProductData from './productData'
import ProductList from './productList'
import { loadHeaderFooter, getParams } from './utils'

loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)

const category = getParams('category')
let title = document.querySelector('#product-type')
title.innerHTML = title.textContent + ` ${category}`
const parentNode = document.querySelector('.product-list')
const selector = '#product-card-template'
const productData = new ProductData()
const productList = new ProductList(category, productData, parentNode)
productList.init(selector)
