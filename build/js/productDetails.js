var i=Object.assign,e=(p,t,r)=>new Promise((s,d)=>{var l=c=>{try{o(r.next(c))}catch(a){d(a)}},n=c=>{try{o(r.throw(c))}catch(a){d(a)}},o=c=>c.done?s(c.value):Promise.resolve(c.value).then(l,n);o((r=r.apply(p,t)).next())});import{getLocalStorage as h,setLocalStorage as u,loadHeaderFooter as m}from"./utils.js";export default class y{constructor(t,r,s){this.productId=t,this.product={},this.ExternalServices=r,this.category=s}init(){return e(this,null,function*(){this.product=yield this.ExternalServices.findProductById(this.productId,this.category),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){return e(this,null,function*(){let t=h("so-cart");if(t===null||t.length===0){u("so-cart",[i(i({},this.product),{quantity:1})]);return}const r=t.map(d=>d.Id===this.product.Id?i(i({},d),{quantity:d.quantity+1}):d);let s=t.find(d=>d.Id===this.product.Id);s!==void 0?u("so-cart",r):u("so-cart",[...t,i(i({},this.product),{quantity:1})])})}renderProductDetails(){const t=this.product.ListPrice!=this.product.FinalPrice?`<p class="product-card__price"><strike>${this.product.ListPrice}</strike> ${this.product.FinalPrice}</p>`:`<p class="product-card__price">${this.product.ListPrice}</p>`,r=`<h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.Name}</h2>
        <img
          class="divider"
          src=${this.product.Images.PrimaryLarge}
          alt=${this.product.Name}
        />
        <p class="product-card__price">${t}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button class="btn-primary" id="addToCart" data-id=${this.product.Id}>Add to Cart</button>
        </div>`;document.querySelector(".product-detail").innerHTML=r,document.querySelector("title").innerHTML=`Sleep Outside | ${this.product.Name}`}}m("../partials/header.html","../partials/footer.html",!1);
