import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../Views/LoginView.vue';
import RegisterView from '../Views/RegisterView.vue';
import HomeView from '../Views/HomeView.vue';
import {auth } from '@/firebase/config';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('../Views/LoginView.vue'),
      meta: { requiresAuth: false}
    },
      {
      name: 'Register',
      path: '/register',
      component: () => import('../Views/RegisterView.vue'),
      meta: { requiresAuth: false}
    },

    
    
    {
      name: ' Home',
      path: '/home',
      component: () => import('../Views/HomeView.vue'),
      meta: { requiresAuth: true}
    },
   
    {
      name: 'createpost',
      path: '/createpost',
      component: () => import('../Views/CreatePostView.vue'),
      meta: { requiresAuth: true}
    }
  
  ],
})

router.beforeEach((to, from, next) => {

  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' });
  }else{
    next()  
  }
});
export default router
