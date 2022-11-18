import{getLocalStorage as c}from"./utils.js";let o=[];function s(r){if(r.ok)return r.json();throw new Error("Bad Response")}function n(){fetch("../json/tents.json").then(s).then(r=>{o=r,a()})}function a(){const r=c("currPageId"),t=o.find(i=>i.Id===r),d=t.ListPrice!=t.FinalPrice?`<p class="product-card__price"><strike>${t.ListPrice}</strike> ${t.FinalPrice}</p>`:`<p class="product-card__price">${t.ListPrice}</p>`,e=`<h3>${t.Brand.Name}</h3>
        <h2 class="divider">${t.Name}</h2>
        <img
          class="divider"
          src=${t.Image}
          alt=${t.Name}
        />

        <p class="product-card__price">${d}</p>
        <p class="product__color">${t.Colors[0].ColorName}</p>
        <p class="product__description">${t.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id=${t.Id}>Add to Cart</button>
        </div>`;return document.querySelector(".product-detail").innerHTML=e,document.querySelector("title").innerHTML=`Sleep Outside | ${t.Name}`,e}n(),c("currPageId");
