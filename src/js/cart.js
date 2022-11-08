import { getLocalStorage, setLocalStorage } from './utils'

function getCartContents() {
  const cartItem = getLocalStorage('so-cart')
  if (cartItem == null) {
    return
  }
  const htmlItems = cartItem.map(item => renderCartItem(item))
  document.querySelector('.product-list').innerHTML = htmlItems.join('')
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`
  return newItem
}

function removeItem(e) {
  e.preventDefault()
  const id = e.target.dataset.id
  if (getLocalStorage('so-cart') !== null) {
    const items = getLocalStorage('so-cart')
    //  const item = items.filter(i => i.Id === id)
    console.log(items)
    const newItems = items.filter(item => item.Id !== id)
    setLocalStorage('so-cart', newItems)
    window.location.reload()
  }
}

getCartContents()
const cartItems = getLocalStorage('so-cart')
if (cartItems !== null) {
  const listeners = document.querySelectorAll('.cart-card__delete')
  const listenersArray = Array.from(listeners)
  listenersArray.map(listener => listener.addEventListener('click', removeItem))
}
