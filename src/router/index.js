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
    // {
    //   path: '/files',
    //   name: 'files',
    //   children: [

    //   ]
    // },
    {
      path: '/client/:route',
      name: 'client',
      component: () => import('../views/client.vue'),
      children: [
        {
          path: '/files',
          name: 'files',
          component: () => import('../components/root/files.vue'),
        },
        {
          path: '/folder/:id',
          name: 'folder',
          component: () => import('../components/root/folder.vue'),
        },         
        {
          path: '/photos',
          name: 'photos',
          component: () => import('../components/root/photos.vue'),
          meta: {
            title: 'Фото',
          }
        },    
        {
          path: '/trash',
          name: 'trash',
          component: () => import('../components/root/trash.vue'),
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
