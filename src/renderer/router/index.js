import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/mainPage').default,
      children: [
        {
          path: '/training',
          component: require('@/components/subpages/training').default
        },
        {
          path: '/testing',
          component: require('@/components/subpages/testing').default
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
