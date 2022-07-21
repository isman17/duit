
import './styles/quasar.sass'
import iconSet from 'quasar/icon-set/material-icons-round.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'bottom-right',
  timeout: 2000,
  actions: [{ icon: 'close', color: 'white' }]
})

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    
  },
  plugins: {
    Notify
  },
  iconSet: iconSet
}