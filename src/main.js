import { createApp } from 'vue'
import App from './layouts/App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions).use(store).use(router)
// Global properties
app.config.globalProperties.baseUrl = 'https://api.frankfurter.app'

app.mount('#app')