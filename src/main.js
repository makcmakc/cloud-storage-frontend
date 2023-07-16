import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

import { registerLayouts } from './layouts/register'


// Styles
import './assets/app.scss'
import './styles/index.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)


registerLayouts(app)

app.mount('#app')
