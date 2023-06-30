import './assets/app.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { registerLayouts } from './layouts/register';


const app = createApp(App)

app.use(createPinia())
app.use(router)

registerLayouts(app)

app.mount('#app')



// const listItems = [
//   {
//     id: 1,
//     filename: 'Cara Delevingne',
//     originalName: 'Cara Delevingne',
//     size: 4903,
//     mimetype: 'image',
//     user: null,
//     deletedAt: new Date(),
//     createdAt: new Date(),

//     // demo
//     url: 'https://w.forfun.com/fetch/59/594a7ca775cfa7df41a4f9e70af26140.jpeg'
//   },
//   {
//     id: 2,
//     filename: 'Cara Delevingne',
//     originalName: 'Cara Delevingne cover interview | Manifesting a baby and leading with kindness',
//     size: 4903,
//     mimetype: 'image',
//     user: null,
//     deletedAt: new Date(),
//     createdAt: new Date(),

//     // demo
//     url: 'https://hips.hearstapps.com/hmg-prod/images/cara6-1643645738.jpg'
//   },
//   {
//     id: 3,
//     filename: 'Cara Delevingne',
//     originalName: "Cara Delevingne's New Bangs Are the Opposite of Blunt",
//     size: 4903,
//     mimetype: 'image',
//     user: null,
//     deletedAt: new Date(),
//     createdAt: new Date(),

//     // demo
//     url: 'https://media.allure.com/photos/646fb788ebb02dd9906ca147/3:2/w_3243,h_2162,c_limit/cara%20delevingne%20choppy%20bangs%20.jpg'
//   },
//   {
//     id: 4,
//     filename: 'Cara Delevingne',
//     originalName: "Cara Delevingne' Book",
//     size: 4903,
//     mimetype: 'pdf',
//     user: null,
//     deletedAt: new Date(),
//     createdAt: new Date(),

//     // demo
//     url: 'https://media.allure.com/photos/646fb788ebb02dd9906ca147/3:2/w_3243,h_2162,c_limit/cara%20delevingne%20choppy%20bangs%20.jpg'
//   }    
// ]