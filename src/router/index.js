import { createRouter, createWebHistory } from 'vue-router'

import { supabase } from '@/core/supabaseClient'

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
      meta: {
        auth: true,
      },
      children: [
        {
          path: '/files',
          name: 'files',
          component: () => import('../components/root/files.vue'),
        },
        // {
        //   path: '/folder/:id',
        //   name: 'folder',
        //   component: () => import('../components/root/folder.vue'),
        // },         
        {
          path: '/photos',
          name: 'photos',
          component: () => import('../components/root/photos.vue'),
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
      meta: {
        auth: false,
      },      
      component: () => import('../views/auth.vue')
    },       
  ]
})




// Route guard for auth routes
router.beforeEach(async (to) => {

  // const { data: { user } } = await supabase.auth.getUser()
  // console.log(user)

  // here we check it the user is logged in
  // if they aren't and the route requries auth we redirect to the login page
  // if (!user && to.meta.auth) {
  //   return { name: "auth" };
  // }
});

export default router
