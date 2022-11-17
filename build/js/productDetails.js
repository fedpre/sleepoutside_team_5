var c=Object.assign,a=(l,t,r)=>new Promise((i,d)=>{var n=o=>{try{s(r.next(o))}catch(e){d(e)}},p=o=>{try{s(r.throw(o))}catch(e){d(e)}},s=o=>o.done?i(o.value):Promise.resolve(o.value).then(n,p);s((r=r.apply(l,t)).next())});import{getLocalStorage as h,setLocalStorage as u}from"./utils.js";export default class m{constructor(t,r){this.productId=t,this.product={},this.productData=r}init(){return a(this,null,function*(){this.product=yield this.productData.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){return a(this,null,function*(){let t=h("so-cart");if(t===null||t.length===0){console.log("here in the first"),u("so-cart",[c(c({},this.product),{quantity:1})]);return}const r=t.map(d=>d.Id===this.product.Id?c(c({},d),{quantity:d.quantity+1}):d);let i=t.find(d=>d.Id===this.product.Id);i!==void 0?u("so-cart",r):u("so-cart",[...t,c(c({},this.product),{quantity:1})])})}renderProductDetails(){const t=`<h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.Name}</h2>
        <img
          class="divider"
          src=${this.product.Image}
          alt=${this.product.Name}
        />
        <p class="product-card__price">${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button class="btn-primary" id="addToCart" data-id=${this.product.Id}>Add to Cart</button>
        </div>`;document.querySelector(".product-detail").innerHTML=t,document.querySelector("title").innerHTML=`Sleep Outside | ${this.product.Name}`}}
