import e from"./ExternalServices.js";import r from"./productList.js";import{loadHeaderFooter as c,getParams as a}from"./utils.js";c("../partials/header.html","../partials/footer.html",!1);const t=a("category");let o=document.querySelector("#product-type");o.innerHTML=o.textContent+` ${t}`;const s=document.querySelector(".product-list"),d="#product-card-template",n=new e,p=new r(t,n,s);p.init(d);
