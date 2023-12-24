import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return 'files'
      }
    },
    {
      path: '/client/:route',
      name: 'client',
      component: () => import('../views/client.vue'),
      children: [
        {
          path: '/files',
          name: 'files',
          component: () => import('../views/files.vue'),
        },
        {
          path: '/photos',
          name: 'photos',
          component: () => import('../views/photos.vue'),
          meta: {
            title: 'Фото',
          }
        },    
        {
          path: '/trash',
          name: 'trash',
          component: () => import('../views/trash.vue'),
          meta: {
            title: 'Корзина',
          }
        }        
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth.vue')
    },       
  ]
})

export default router
