import { loadHeaderFooter, alertMessage } from './utils';
import ExternalService from './ExternalServices'
loadHeaderFooter('../partials/header.html', '../partials/footer.html', false)

const services = new ExternalService()

async function registration(data, next) {
  try {
    const registerResponse = await services.registerRequest(data);
    console.log(registerResponse)
    next()
  } 
  catch(err) {
    console.log(err)
  }
}

document.querySelector('#register-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    address: e.target.address.value
  }
  registration(data, () => {
    console.log('registered')
    window.location.replace('/');
  })
}, false)


