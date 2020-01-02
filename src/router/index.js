import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Book from '@/components/book'
import Account from '@/components/account'
import Register from '@/components/register'
import Topbar from '@/components/topBar'
import Send from '@/components/sendMessage'
import Receive from '@/components/receiveMessage'
import Timet from '@/components/timeTable'
import Books from '@/components/bookShow'

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
          component: Home,
          redirect: '/timet',
          children: [
            {path: '/timet', name: 'Timet', component: Timet},
            {path: '/books', name: 'Books', component: Books}
          ]
        },
        {
          path: '/book',
          name: 'Book',
          component: Book,
          redirect: '/send',
          children: [
            {path: '/send', name: 'Send', component: Send},
            {path: '/receive', name: 'Receive', component: Receive}
          ]
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
