import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Book from '@/components/book'
import Account from '@/components/account'
import Register from '@/components/register'
import Topbar from '@/components/topBar'

Vue.use(Router)
const Login = resolve => require(['@/components/login'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/timeBook',
      name: 'topBar',
      component: Topbar,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/book',
          name: 'Book',
          component: Book
        },
        {
          path: '/account',
          name: 'Account',
          component: Account
        }
      ]
    }
  ]
})
