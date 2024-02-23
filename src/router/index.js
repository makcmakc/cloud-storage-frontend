import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from "../middleware/layout.middleware"
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
    {
      path: '/files',
      name: 'files',
      component: () => import('../components/root/files.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/photos',
      name: 'photos',
      component: () => import('../components/root/photos.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/trash',
      name: 'trash',
      component: () => import('../components/root/trash.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',   
      component: () => import('../views/auth.vue'),
      meta: { requiresAuth: false, layout: 'empty' }
    },
  ]
})


// Add middleware to router
router.beforeEach(loadLayoutMiddleware);

// Route guard for auth routes
router.beforeEach(async (to, from, next) => {

  const user = await supabase.auth.getSession()

  if (to.meta.requiresAuth) {
    // here we check it the users is logged in
    // if they aren't and the route requries auth we redirect to the auth page
    if (!user.data.session) next({ path: '/auth' })
    else next()
  }
  if (!to.meta.requiresAuth) {
    if (user.data.session) next({ path: '/files' })
    else next()
  }  
  else next()
});

export default router
