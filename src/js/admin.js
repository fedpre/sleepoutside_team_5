import { loadHeaderFooter, alertMessage } from './utils'
import ExternalServices from './ExternalServices'
loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }

  init() {}

  async login(creds, next) {
    try {
      const loginResponse = await this.services.loginRequest(creds);
      this.token = loginResponse.accessToken
      next()
    } 
    catch(err) {
      alertMessage(err.message.message);
    }
  }

  showLogin() {
    const container = document.createElement('div')
    container.setAttribute('class', 'login-container')
    const form = document.createElement('form')
    form.setAttribute('class', 'checkout-form')
    form.setAttribute('id', 'login-form')
    const divInputEmail = document.createElement('div')
    divInputEmail.setAttribute('class', 'input-field')
    const labelEmail = document.createElement('label')
    labelEmail.innerHTML = 'Email'
    const inputEmail = document.createElement('input')
    inputEmail.type = 'email'
    inputEmail.name = 'email'
    inputEmail.id = 'email'
    inputEmail.placeholder = 'john@doe.com'
    inputEmail.required = true
    inputEmail.value = 'user1@email.com'

    const divInputPassword = document.createElement('div')
    divInputPassword.setAttribute('class', 'input-field')
    const labelPassword = document.createElement('label')
    labelPassword.innerHTML = 'Password'
    const inputPassword = document.createElement('input')
    inputPassword.type = 'password'
    inputPassword.name = 'password'
    inputPassword.id = 'password'
    inputPassword.placeholder = 'password'
    inputPassword.required = true
    inputPassword.value = 'user1'

    const loginBtn = document.createElement('button')
    loginBtn.setAttribute('class', 'btn-primary')
    loginBtn.setAttribute('id', 'loginBtn')
    loginBtn.type = 'submit'
    loginBtn.innerHTML = 'Login'

    divInputEmail.appendChild(labelEmail)
    divInputEmail.appendChild(inputEmail)
    divInputPassword.appendChild(labelPassword)
    divInputPassword.appendChild(inputPassword)
    form.appendChild(divInputEmail)
    form.appendChild(divInputPassword)
    form.appendChild(loginBtn)
    container.appendChild(form)
    this.mainElement.appendChild(container)
  }
  orderHtml() {
    return `<h2>Current Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>
    `;
  }

  async showOrders() {
    try {
      const orders = await this.services.getOrders(this.token);
      this.mainElement.innerHTML = this.orderHtml();
      const parent = document.querySelector('#orders tbody');
      parent.innerHTML = orders.map(order=> `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString('en-US')}</td><td>${order.items.length}</td><td>${order.orderTotal}</td></tr>`).join('');
    } catch(err) {
      console.log(err);
    }
  }


}

const admin = new Admin('main')
admin.showLogin()

document.querySelector('#login-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const creds = {
    email: e.target.email.value,
    password: e.target.password.value
  }
  admin.login(creds, () => {
    console.log('logged in')
    admin.showOrders()
  })
}, false)