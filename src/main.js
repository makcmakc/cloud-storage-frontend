import './assets/main.css'
import './assets/app.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { registerLayouts } from './layouts/register';

const app = createApp(App)


app.use(createPinia())
app.use(router)

registerLayouts(app);

app.mount('#app')
