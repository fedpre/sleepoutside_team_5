var o=Object.assign;import{getLocalStorage as n,setLocalStorage as d}from"./utils.js";function i(){const t=n("so-cart");if(t==null)return;const r=t.map(e=>u(e));document.querySelector(".product-list").innerHTML=r.join("")}function u(t){const r=`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
   <a href="" class="cart-card__delete "><span class="material-symbols-outlined" data-id=${t.Id}>delete</span></a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <span class="qt-num">${t.quantity}</span></p>
<button data-id=${t.Id} class="cart-card__addQuantity btn-secondary">+</button>
<button data-id=${t.Id} class="cart-card__removeQuantity btn-secondary">-</button>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`;return r}function m(t){t.preventDefault();const r=t.target.dataset.id;if(n("so-cart")!==null){const e=n("so-cart"),c=e.filter(a=>a.Id!==r);d("so-cart",c),window.location.reload()}}function y(t){const r=t.target.dataset.id,e=n("so-cart"),c=e.map(a=>a.Id===r?o(o({},a),{quantity:a.quantity+1}):a);d("so-cart",c),window.location.reload()}function _(t){const r=t.target.dataset.id,e=n("so-cart"),c=e.map(a=>a.Id===r?o(o({},a),{quantity:a.quantity-1}):a);d("so-cart",c),window.location.reload()}i();const p=n("so-cart");if(p!==null){const t=document.querySelectorAll(".cart-card__delete"),r=Array.from(t);r.map(s=>s.addEventListener("click",m));const e=document.querySelectorAll(".cart-card__addQuantity"),c=Array.from(e);c.map(s=>s.addEventListener("click",y));const a=document.querySelectorAll(".cart-card__removeQuantity"),l=Array.from(a);l.map(s=>s.addEventListener("click",_))}
