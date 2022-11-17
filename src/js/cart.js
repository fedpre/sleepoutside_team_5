import ShoppingCart from './shoppingCart'
import { getLocalStorage, loadHeaderFooter } from './utils'

(async function main() {
  const parentNode = document.querySelector('.product-list')
  const selector = '#product-cart-template'
  const shoppingCart = new ShoppingCart(parentNode)
  await shoppingCart.init(selector)

  const cartItems = getLocalStorage('so-cart')
  if (cartItems !== null) {
    const deleteListeners = document.querySelectorAll('.cart-card__delete')
    const deleteListenersArray = Array.from(deleteListeners)
    deleteListenersArray.map(listener =>
      listener.addEventListener('click', shoppingCart.removeItem)
    )

    // Listeners for add buttons
    const addListeners = document.querySelectorAll('.cart-card__addQuantity')
    const addListenersArray = Array.from(addListeners)
    addListenersArray.map(listener =>
      listener.addEventListener('click', shoppingCart.addQuantity)
    )

    // Listeners for remove buttons
    const removeListeners = document.querySelectorAll(
      '.cart-card__removeQuantity'
    )
    const removeListenersArray = Array.from(removeListeners)
    removeListenersArray.map(listener =>
      listener.addEventListener('click', shoppingCart.removeQuantity)
    )
  }
})()

loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)
