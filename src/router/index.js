import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        return 'files'
      }
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('../views/files.vue'),
      meta: {
        title: 'Файлы',
        layout: 'default',
      }
    },
    {
      path: '/photos',
      name: 'photos',
      component: () => import('../views/photos.vue'),
      meta: {
        title: 'Фото',
        layout: 'default',
      }
    },
    {
      path: '/trash',
      name: 'trash',
      component: () => import('../views/trash.vue'),
      meta: {
        title: 'Корзина',
        layout: 'default'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth.vue'),
      meta: {
        layout: 'empty',
      }
    }         
  ]
})

export default router
