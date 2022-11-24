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

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div')
  // add a class to style the alert
  alert.classList.add('alert')
  // set the contents. You should have a message and an X or something the user can click on to remove
  const keys = Object.keys(message)

  keys.map(key => {
    const p = document.createElement('p')
    p.innerText = message[key]
    alert.appendChild(p)
    const pX = document.createElement('span')
    pX.innerText = 'X'
    alert.appendChild(pX)
  })
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function (e) {
    if (e.target.tagName) {
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this)
    }
  })
  // add the alert to the top of main
  const main = document.querySelector('main')
  main.prepend(alert)
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0)
}

export function createBreadcrumb(category, noItems = 0, parentNode) {
  const prodCatNode = document.createElement('span')
  prodCatNode.innerText = `${category} >> `
  parentNode.appendChild(prodCatNode)
  const noItemsNode = document.createElement('span')
  noItemsNode.innerText = `(${noItems} items)`
  parentNode.appendChild(noItemsNode)
}
