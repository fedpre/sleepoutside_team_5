// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector)
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', event => {
    event.preventDefault()
    callback()
  })
  qs(selector).addEventListener('click', callback)
}

export function getParams(param) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param)
}

export function renderListWithTemplate(
  templateElement,
  parentElement,
  list,
  category = '',
  callback
) {
  parentElement.innerHTML = ''
  list.map(product => {
    const node = templateElement.content.cloneNode(true)
    const childNode = callback(node, product, category)
    parentElement.appendChild(childNode)
  })
}

export function renderWithTemplate(
  templateElement,
  parentElement,
  homepage,
  isHeader = false,
  data,
  callback
) {
  let clone = templateElement.content.cloneNode(true)
  if (callback) {
    clone = callback(clone, data)
  } else if (!homepage && isHeader) {
    clone.querySelector('img').src = '../images/noun_Tent_2517.svg'
    clone.querySelector('a').href = '../index.html'
    clone.querySelector('#cart-link').href = '../cart/'
  }
  parentElement.appendChild(clone)
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(data => data.text())
  const template = document.createElement('template')
  template.innerHTML = html
  return template
}

export async function loadHeaderFooter(headerPath, footerPath, homepage) {
  const headerTemplate = await loadTemplate(headerPath)
  const footerTemplate = await loadTemplate(footerPath)

  const headerEl = document.querySelector('header')
  const footerEl = document.querySelector('footer')

  renderWithTemplate(headerTemplate, headerEl, homepage, true)
  renderWithTemplate(footerTemplate, footerEl, homepage)
}
