import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import { registerCustomIcons } from './common/icons'

// Styles
import './styles/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

// registerCustomIcons(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
