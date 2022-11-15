export default class Alert {
  constructor() {}

  init() {
    this.getAlerts()
  }

  convertToJson(res) {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Bad Response')
    }
  }

  createAlerts(alertList, parentNode, referenceNode) {
    const section = document.createElement('section')
    section.setAttribute('class', 'alert-list')
    alertList.map(alert => {
      const p = document.createElement('p')
      p.innerHTML = alert.message
      p.style.color = alert.color
      p.style.backgroundColor = alert.background
      p.style.padding = '15px'
      parentNode.insertBefore(p, referenceNode)
    })
  }

  async getAlerts() {
    const parentNode = document.querySelector('main')
    const referenceNode = document.querySelector('.hero')
    const alerts = await fetch('../json/alert.json')
                         .then(this.convertToJson)
                         .then(jsonAlerts => jsonAlerts)
    if (alerts) {
      this.createAlerts(alerts, parentNode, referenceNode)
    }
  }
}
