var i=(u,e,t)=>new Promise((r,a)=>{var c=s=>{try{n(t.next(s))}catch(l){a(l)}},o=s=>{try{n(t.throw(s))}catch(l){a(l)}},n=s=>s.done?r(s.value):Promise.resolve(s.value).then(c,o);n((t=t.apply(u,e)).next())});import{renderListWithTemplate as d}from"./utils.js";export default class m{constructor(e,t,r){this.category=e,this.productData=t,this.listElement=r,this.products={},this.acceptedItems=["880RR","985RF","985PR","344YJ"]}init(e){return i(this,null,function*(){this.products=yield this.getAllProducts(t=>this.acceptedItems.includes(t.Id)),this.renderList(this.products,e,this.listElement)})}getAllProducts(e=null){return i(this,null,function*(){if(e!==null){const t=yield this.productData.getData(e);return this.filterProducts(t,e)}return yield this.productData.getData()})}filterProducts(e,t){return i(this,null,function*(){return e.filter(r=>t(r))})}prepareTemplate(e,t){const r=e,a=r.querySelector("a"),c=r.querySelector("img"),o=r.querySelector(".card__brand"),n=r.querySelector(".card__name"),s=r.querySelector(".product-card__price");return a.href=a.href+t.Id,c.src=t.Image,c.alt=t.Name,o.textContent=t.Name,n.textContent=t.NameWithoutBrand,s.textContent=s.textContent+t.ListPrice,r}renderList(e,t,r){const a=document.querySelector(t);d(a,r,e,this.prepareTemplate)}}
