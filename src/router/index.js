import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/Home'),
    children: [
      { path: 'welcome', component: () => import('@/views/Home/components/welcome.vue') },
      { path: 'users', component: () => import('@/views/User') },
      { path: 'roles', component: () => import('@/views/Roles') },
      { path: 'rights', component: () => import('@/views/Roles/rights.vue') },
      {
        path: 'goods',
        component: () => import('@/views/Goods/goodList.vue'),
        children: [
          { path: 'add', component: () => import('@/views/Goods//components/addGoods.vue') }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
