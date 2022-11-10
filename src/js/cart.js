import { getLocalStorage, setLocalStorage } from './utils'

function getCartContents() {
  const cartItem = getLocalStorage('so-cart')
  if (cartItem == null) {
    return
  }
  const renderItems = cartItem.map(item => renderCartItem(item))

  document.querySelector('.product-list').innerHTML = renderItems.join('')
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
   <a href="" class="cart-card__delete "><span class="material-symbols-outlined" data-id=${item.Id}>delete</span></a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <span class="qt-num">${item.quantity}</span></p>
<button data-id=${item.Id} class="cart-card__addQuantity btn-secondary">+</button>
<button data-id=${item.Id} class="cart-card__removeQuantity btn-secondary">-</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`
  return newItem
}

function removeItem(e) {
  e.preventDefault()
  const id = e.target.dataset.id
  if (getLocalStorage('so-cart') !== null) {
    const items = getLocalStorage('so-cart')
    const newItems = items.filter(item => item.Id !== id)
    setLocalStorage('so-cart', newItems)
    window.location.reload()
  }
}

function addQuantity(e) {
  const id = e.target.dataset.id
  const currItems = getLocalStorage('so-cart')
  const addItemsArray = currItems.map(item =>
    item.Id === id ? { ...item, quantity: item.quantity + 1 } : item
  )
  setLocalStorage('so-cart', addItemsArray)
  window.location.reload()
}

function removeQuantity(e) {
  const id = e.target.dataset.id
  const currItems = getLocalStorage('so-cart')
  const addItemsArray = currItems.map(item =>
    item.Id === id ? { ...item, quantity: item.quantity - 1 } : item
  )
  setLocalStorage('so-cart', addItemsArray)
  window.location.reload()
}

getCartContents()
const cartItems = getLocalStorage('so-cart')
if (cartItems !== null) {
  const deleteListeners = document.querySelectorAll('.cart-card__delete')
  const deleteListenersArray = Array.from(deleteListeners)
  deleteListenersArray.map(listener =>
    listener.addEventListener('click', removeItem)
  )

  // Listeners for add buttons
  const addListeners = document.querySelectorAll('.cart-card__addQuantity')
  const addListenersArray = Array.from(addListeners)
  addListenersArray.map(listener =>
    listener.addEventListener('click', addQuantity)
  )

  // Listeners for remove buttons
  const removeListeners = document.querySelectorAll(
    '.cart-card__removeQuantity'
  )
  const removeListenersArray = Array.from(removeListeners)
  removeListenersArray.map(listener =>
    listener.addEventListener('click', removeQuantity)
  )
}
