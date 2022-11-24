var h=(s,t,e)=>new Promise((o,i)=>{var l=r=>{try{n(e.next(r))}catch(c){i(c)}},a=r=>{try{n(e.throw(r))}catch(c){i(c)}},n=r=>r.done?o(r.value):Promise.resolve(r.value).then(l,a);n((e=e.apply(s,t)).next())});import u from"./ExternalServices.js";import{getLocalStorage as p,alertMessage as d}from"./utils.js";const m=new u;function S(s){return s.map(t=>({id:t.Id,name:t.Name,price:t.ListPrice,quantity:t.quantity}))}function y(s){let t={};for(let e of s.keys())t[e]=s.get(e);return JSON.stringify(t)}export default class T{constructor(t,e){this.key=t,this.outputSelector=e,this.list=[],this.itemCount=0,this.itemTotal=0,this.shipping=0,this.tax=0,this.orderTotal=0}init(){this.list=p(this.key),this.calculateItemSummary()}calculateItemSummary(){this.itemCount=this.list.reduce((t,e)=>t+e.quantity,0),this.itemTotal=Math.round(this.list.reduce((t,e)=>t+e.ListPrice*e.quantity,0)*100)/100,this.outputSelector.querySelector(".item-subtotal").innerText=this.itemCount,this.outputSelector.querySelector(".subtotal-value").innerText=`$${this.itemTotal}`}calculateOrderTotal(){this.shipping=this.calculateShipping(this.itemCount),this.tax=Math.round(this.calculateTaxes(this.itemTotal,.06)*100)/100,this.displayOrderTotals()}displayOrderTotals(){this.orderTotal=Math.round((this.itemTotal+this.shipping+this.tax)*100)/100,this.outputSelector.querySelector(".shipping-amount").innerText=`$${this.shipping}`,this.outputSelector.querySelector(".tax-amount").innerText=`$${this.tax}`,this.outputSelector.querySelector(".order-total").innerText=`$${this.orderTotal}`}calculateShipping(t){return t===1?10:10+(t-1)*2}calculateTaxes(t,e){return t*e}checkout(t,e){return h(this,null,function*(){e.preventDefault();const o=S(this.list);let i=new FormData(t);i.append("items",o),i.append("orderDate",new Date),i.append("orderTotal",this.itemTotal),i.append("shipping",this.shipping),i.append("tax",this.tax.toString);const l=y(i);try{const a=yield m.checkout(l);localStorage.clear(),window.location.href="./checkedout.html"}catch(a){console.error(a),d(a.message)}})}}
