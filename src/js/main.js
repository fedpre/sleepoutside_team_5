import Alert from './alert'
import { loadHeaderFooter } from './utils'

loadHeaderFooter('./partials/header.html', './partials/footer.html', true)

const alerts = new Alert()
alerts.init()
