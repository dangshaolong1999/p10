import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/home'),
    redirect: '/study',
    children:[
      {
        path: '/study',
        component: () => import('../views/study')
      },
      {
        path: '/teacher',
        component: () => import('../views/teacher')
      },
      {
        path: '/assistant',
        component: () => import('../views/assistant')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
