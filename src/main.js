import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Styles
// import './assets/app.scss'
import './styles/index.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
