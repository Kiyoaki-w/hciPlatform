import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: require('@/components/mainPage').default,
      children: [
        {
          path: 'training',
          component: require('@/components/subpages/training').default
        },
        {
          path: 'testing',
          component: require('@/components/subpages/testing').default
        },
      ]
    },
    {
      path: '/',
      name: 'landing',
      component: require('@/components/landingPage').default,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
