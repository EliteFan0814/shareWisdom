import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/Layout'
import Login from '@/views/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/',
      component: Layout,
      children: [
        //首页
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home'),
          meta: { title: '钱包余额' },
          // alias: '/'
        },

        // 用工信息
        {
          path: '/sharewisdominfo/EmployInfo',
          name: 'EmployInfo',
          component: () => import('@/views/sharewisdominfo/EmployInfo'),
          meta: { title: '用工信息' }
        },

        // 外协信息
        {
          path: '/sharewisdominfo/ExternalInfo',
          name: 'ExternalInfo',
          component: () => import('@/views/sharewisdominfo/ExternalInfo'),
          meta: { title: '外协信息' }
        },

        // 服务信息lalal
        {
          path: '/sharewisdominfo/ServiceInfo',
          name: 'ServiceInfo',
          component: () => import('@/views/sharewisdominfo/ServiceInfo'),
          meta: { title: '服务信息' }
        }
      ]
    }
  ]
})
