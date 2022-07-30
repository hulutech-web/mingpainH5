import Vue from 'vue'
import VueRouter from 'vue-router'
import Mask from '../views/Mask.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/mask'
  },
  {
    path: '/index.html',
    name: 'mask',
    redirect: '/mask'
  }, {
    path: "/mask",
    component: Mask,
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
