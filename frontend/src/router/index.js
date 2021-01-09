import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Profile from '@/views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/rules',
    name: 'rules',
    component: Rules
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/Privacy.vue')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
