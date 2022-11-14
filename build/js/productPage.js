import{getLocalStorage as o}from"./utils.js";let d=[];function n(e){if(e.ok)return e.json();throw new Error("Bad Response")}function a(){fetch("../json/tents.json").then(n).then(e=>{d=e,s()})}function s(){const e=o("currPageId"),t=d.find(c=>c.Id===e),r=`<h3>${t.Brand.Name}</h3>
        <h2 class="divider">${t.Name}</h2>
        <img
          class="divider"
          src=${t.Image}
          alt=${t.Name}
        />

        <p class="product-card__price">${t.ListPrice}</p>
        <p class="product__color">${t.Colors[0].ColorName}</p>
        <p class="product__description">${t.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id=${t.Id}>Add to Cart</button>
        </div>`;return document.querySelector(".product-detail").innerHTML=r,document.querySelector("title").innerHTML=`Sleep Outside | ${t.Name}`,r}a(),o("currPageId");
