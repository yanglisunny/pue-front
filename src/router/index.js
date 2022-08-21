import {createRouter, createWebHistory} from 'vue-router'
import store from "../store"

/** layout */
const Layout = () => import('../pages/layout/layout.vue')

const Login = () => import('../pages/login/index.vue')
const Weather = () => import('../pages/weather/index.vue')

const routes = [
  { path: '/', redirect: '/weather' },
  { 
    path: '/weather', 
    name: 'layout', 
    component: Layout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/weather',
        name: 'weather',
        component: Weather
      }
    ] 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!store.state.token && to.fullPath !== "/login") {
    next("/login")
  } else {
    next()
  }
})

export default router