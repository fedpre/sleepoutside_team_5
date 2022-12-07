var o=Object.assign;var u=(p,r,e)=>new Promise((s,t)=>{var a=c=>{try{i(e.next(c))}catch(l){t(l)}},d=c=>{try{i(e.throw(c))}catch(l){t(l)}},i=c=>c.done?s(c.value):Promise.resolve(c.value).then(a,d);i((e=e.apply(p,r)).next())});import{getLocalStorage as m,setLocalStorage as n,loadHeaderFooter as h}from"./utils.js";export default class g{constructor(r,e,s){this.productId=r,this.product={},this.ExternalServices=e,this.category=s}init(){return u(this,null,function*(){this.product=yield this.ExternalServices.findProductById(this.productId,this.category),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this)),console.log(this.product)})}getName(){return this.product.Name}addToCart(){return u(this,null,function*(){let r=m("so-cart");if(r===null||r.length===0){n("so-cart",[o(o({},this.product),{quantity:1})]);return}const e=r.map(t=>t.Id===this.product.Id?o(o({},t),{quantity:t.quantity+1}):t);r.find(t=>t.Id===this.product.Id)!==void 0?n("so-cart",e):n("so-cart",[...r,o(o({},this.product),{quantity:1})])})}renderProductDetails(){let r=`<h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.Name}</h2>
        <div class="image-carousel">`;this.product.Images.ExtraImages&&this.product.Images.ExtraImages.map(t=>{r+=`<img class="alt-img" src="${t.Src}" alt="${t.Title}"/> `}),r+=`
        </div>
        <img
          class="divider prodImg"
          src=${this.product.Images.PrimaryLarge}
          alt=${this.product.Name}
        />
        <p class="product-card__price">$${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <div class="product__colorPicker">`,this.product.Colors&&this.product.Colors.map(t=>{r+=`<img class="color-picker-img" src="${t.ColorPreviewImageSrc}" data-name="${t.ColorName}" />`}),r+=`</div><p class="product__description">${this.product.DescriptionHtmlSimple}</p>
                          <div class="product-detail__add">
                          <button class="btn-primary" id="addToCart" data-id=${this.product.Id}>Add to Cart</button>
                          </div>`,document.querySelector(".product-detail").innerHTML=r,document.querySelector("title").innerHTML=`Sleep Outside | ${this.product.Name}`,document.querySelectorAll(".color-picker-img").forEach(t=>{t.addEventListener("click",()=>{const a=document.querySelector(".prodImg");a.src=t.src;const d=document.querySelector(".product__color");d.innerHTML=t.dataset.name})}),document.querySelectorAll(".alt-img").forEach(t=>{t.addEventListener("click",()=>{const a=document.querySelector(".prodImg");a.src=t.src})})}}h("../partials/header.html","../partials/footer.html",!1);
