import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search.vue'
import Profile from '@/views/Profile.vue'
import Rules from '@/views/Rules.vue'
import Privacy from '@/views/Privacy.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/rules',
    name: 'rules',
    component: Rules
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/',
    name: 'search',
    component: Search
  },
  {
    path: '/users/:id(\\d+)',
    name: 'profile',
    component: Profile,
    props: route => ({ id: Number(route.params.id) })
  },
  {
    path: '*',
    name: 'notfound',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
