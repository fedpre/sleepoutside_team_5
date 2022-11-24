var i=Object.assign,m=(y,e,t)=>new Promise((r,n)=>{var a=o=>{try{s(t.next(o))}catch(c){n(c)}},l=o=>{try{s(t.throw(o))}catch(c){n(c)}},s=o=>o.done?r(o.value):Promise.resolve(o.value).then(a,l);s((t=t.apply(y,e)).next())});import{getLocalStorage as d,setLocalStorage as u,renderListWithTemplate as q}from"./utils.js";export default class I{constructor(e){this.cartList=[],this.listElement=e,this.cartTotalValue=0}init(e,t){return m(this,null,function*(){this.cartList=yield this.getCartContent(),this.cartTotalValue=this.cartTotal(t),this.renderCartItems(this.cartList,e,this.listElement)})}getCartContent(){const e=d("so-cart");return e==null?[]:e}cartTotal(e){if(this.cartList.length===0)return e.innerText=e.innerText+" $0",0;e.innerText=e.innerText+` $${Math.round(this.cartList.reduce((t,r)=>t+r.ListPrice*r.quantity,0)*100)/100}`}prepareTemplate(e,t){const r=e,n=r.querySelector(".prod-img");n.src=t.Images.PrimaryMedium,t.alt=t.Name;const a=r.querySelector(".card__name");a.innerHTML=t.Name;const l=r.querySelector(".material-symbols-outlined");l.setAttribute("data-id",t.Id);const s=r.querySelector(".cart-card__color");s.innerHTML=t.Colors[0].ColorName;const o=r.querySelector(".qt-num");o.innerHTML=t.quantity;const c=r.querySelector(".cart-card__addQuantity");c.setAttribute("data-id",t.Id);const h=r.querySelector(".cart-card__removeQuantity");h.setAttribute("data-id",t.Id);const p=r.querySelector(".cart-card__price");return p.innerHTML=`$${t.FinalPrice}`,r}renderCartItems(e,t,r){const n=document.querySelector(t);let a;q(n,r,e,a,this.prepareTemplate)}removeItem(e){e.preventDefault();const t=e.target.dataset.id;if(d("so-cart")!==null){const r=d("so-cart"),n=r.filter(a=>a.Id!==t);u("so-cart",n),window.location.reload()}}addQuantity(e){const t=e.target.dataset.id,r=d("so-cart"),n=r.map(a=>a.Id===t?i(i({},a),{quantity:a.quantity+1}):a);u("so-cart",n),window.location.reload()}removeQuantity(e){const t=e.target.dataset.id,r=d("so-cart"),n=r.map(a=>a.Id===t?i(i({},a),{quantity:a.quantity-1}):a);u("so-cart",n),window.location.reload()}}
