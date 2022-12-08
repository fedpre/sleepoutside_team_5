import { getLocalStorage, loadHeaderFooter } from './utils';
import WishlistData from './wishlistData'

(async function main() {
  const parentNode = document.querySelector('.product-list')
  const selector = '#product-cart-template'
  const wishlistData = new WishlistData(parentNode)
  await wishlistData.init(selector, 'so-wishlist')

  const wishlistItems = getLocalStorage('so-wishlist')
  if (wishlistItems !== null) {
    const deleteListeners = document.querySelectorAll('.cart-card__delete')
    const deleteListenersArray = Array.from(deleteListeners)
    deleteListenersArray.map(listener =>
      listener.addEventListener('click', wishlistData.removeItem)
    )
  }
})()

loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)