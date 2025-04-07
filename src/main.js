import './assets/css/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './js/router'
import productManager from './api/product.js'
import userManager from './api/user'

const app = createApp(App)

app.config.globalProperties.$productManager = productManager
app.config.globalProperties.$userManager = userManager

app.use(router)
app.mount('#app')
