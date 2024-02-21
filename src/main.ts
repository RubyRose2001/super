// import './assets/main.css'
import './assets/css/index.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { pinia } from './utils/pinia'

const app = createApp(App)
// const pinia = createPinia()
app.use(pinia)
app.use(router)


app.mount('#app')
