import { getLocalStorage, setLocalStorage } from './utils'
const itemQt = []

function getCartContents() {
  const cartItem = getLocalStorage('so-cart')
  if (cartItem == null) {
    return
  }
  const noDuplCart = []
  cartItem.map(item => {
    let id = item.Id
    if (!noDuplCart.includes(id)) {
      noDuplCart.push(id)
    }
  })

  const renderItems = noDuplCart.map(id => {
    const qt = cartItem.filter(i => i.Id === id).length
    const item = cartItem.find(el => el.Id === id)
    itemQt.push({ item: item.Id, quantity: qt || 1 })
    return renderCartItem(item, itemQt.at(-1).quantity)
  })
  console.log(itemQt)

  document.querySelector('.product-list').innerHTML = renderItems.join('')
}

function countItems(list, id) {
  return list.filter(item => item.Id === id).length
}

function renderCartItem(item, quantity) {
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
  <p class="cart-card__quantity">qty: <span class="qt-num">${quantity}</span></p>
<button dataset=${item.Id} class="cart-card__addQuantity">+</button>
<button dataset=${item.Id} class="cart-card__removeQuantity">-</button>
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
  const quantity = document.querySelector('.qt-num')
  const newQt = parseInt(quantity.innerHTML) + 1
  quantity.innerHTML = newQt
  itemQt.map(item => {
    console.log(e.target.dataset)
    if (item.Id === e.target.dataset) {
      ;[...itemQt, { ...item, quantity: quantity + 1 }]
    }
  })
  console.log(itemQt)
}

function removeQuantity(e) {
  const quantity = document.querySelector('.qt-num')
  const newQt = parseInt(quantity.innerHTML) - 1
  quantity.innerHTML = newQt
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
