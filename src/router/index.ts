import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateAccount from '../views/CreateAccount.vue'
import Login from '../views/Login.vue'
import SelectCharacter from '../views/SelectCharacter.vue'
import CreateCharacter from '../views/CreateCharacter.vue'
import Town from '../views/Town.vue'
import Npc from '../views/Npc.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: SelectCharacter
  },
  {
    path: '/create-account',
    name: 'create-account',
    component: CreateAccount
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/select-character',
    name: 'select-character',
    component: SelectCharacter
  },
  {
    path: '/create-character',
    name: 'create-character',
    component: CreateCharacter
  },
  {
    path: '/town',
    name: 'town',
    component: Town
  },
  {
    path: '/npc',
    name: 'npc',
    component: Npc
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
