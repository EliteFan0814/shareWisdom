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
          meta: { title: '统计' },
          // alias: '/'
        },

        // 用工信息
        {
          path: '/mallManage/CarouselSet',
          name: 'CarouselSet',
          component: () => import('@/views/mallManage/CarouselSet'),
          meta: { title: '用工信息' }
        },

        // 外协信息
        {
          path: '/mallManage/GoodsManage',
          name: 'GoodsManage',
          component: () => import('@/views/mallManage/GoodsManage'),
          meta: { title: '外协信息' }
        },

        // 服务信息
        {
          path: '/orderManage/RetailOrder',
          name: 'RetailOrder',
          component: () => import('@/views/orderManage/RetailOrder'),
          meta: { title: '服务信息' }
        },

        // 批发订单
        // {
        //   path: '/orderManage/WholesaleOrder',
        //   name: 'WholesaleOrder',
        //   component: () => import('@/views/orderManage/WholesaleOrder'),
        //   meta: { title: '批发订单' }
        // },

        //寄售队列
        // {
        //   path: '/consignment/Consignment',
        //   name: 'Consignment',
        //   component: () => import('@/views/consignment/Consignment'),
        //   meta: { title: '寄售队列' }
        // },

        //会员管理
        // {
        //   path: '/member/MemberList',
        //   name: 'MemberList',
        //   component: () => import('@/views/member/MemberList'),
        //   meta: { title: '会员列表' }
        // },
        // {
        //   path: '/member/TeamMap',
        //   name: 'TeamMap',
        //   component: () => import('@/views/member/TeamMap'),
        //   meta: { title: '团队图谱' }
        // },
        // {
        //   path: '/member/RechargeRecord',
        //   name: 'RechargeRecord',
        //   component: () => import('@/views/member/RechargeRecord'),
        //   meta: { title: '系统充值记录' }
        // },
        
        //提现管理
        // {
        //   path: '/withdrawData/WithdrawData',
        //   name: 'WithdrawData',
        //   component: () => import('@/views/withdrawData/WithdrawData'),
        //   meta: { title: '提现管理' }
        // },

        // 文章管理
        // {
        //   path: '/article/RegistAgreement',
        //   name: 'RegistAgreement',
        //   component: () => import('@/views/article/RegistAgreement'),
        //   meta: { title: '用户协议' }
        // },
        // {
        //   path: '/article/UsingHelp',
        //   name: 'UsingHelp',
        //   component: () => import('@/views/article/UsingHelp'),
        //   meta: { title: '使用帮助' }
        // },
        // {
        //   path: '/article/platformPlacard',
        //   name: 'platformPlacard',
        //   component: () => import('@/views/article/platformPlacard'),
        //   meta: { title: '平台公告' }
        // },
        // {
        //   path: '/article/AboutUs',
        //   name: 'AboutUs',
        //   component: () => import('@/views/article/AboutUs'),
        //   meta: { title: '关于我们' }
        // },
        // {
        //   path: '/article/CommonProblem',
        //   name: 'CommonProblem',
        //   component: () => import('@/views/article/CommonProblem'),
        //   meta: { title: '常见问题' }
        // },

        // 意见反馈
        // {
        //   path: '/feedback/Feedback',
        //   name: 'Feedback',
        //   component: () => import('@/views/feedback/Feedback'),
        //   meta: { title: '意见反馈' }
        // },

        // 系统设置
        // {
        //   path: '/systemSetting/PeriodSetting',
        //   name: 'PeriodSetting',
        //   component: () => import('@/views/systemSetting/PeriodSetting'),
        //   meta: { title: '期次配置' }
        // },
        // {
        //   path: '/systemSetting/ZhimaliSetting',
        //   name: 'ZhimaliSetting',
        //   component: () => import('@/views/systemSetting/ZhimaliSetting'),
        //   meta: { title: '芝麻粒设置' }
        // },
        // {
        //   path: '/systemSetting/CouponSetting',
        //   name: 'CouponSetting',
        //   component: () => import('@/views/systemSetting/CouponSetting'),
        //   meta: { title: '优惠券设置' }
        // },
        // {
        //   path: '/systemSetting/BonusSetting',
        //   name: 'BonusSetting',
        //   component: () => import('@/views/systemSetting/BonusSetting'),
        //   meta: { title: '奖金设置' }
        // },
        // {
        //   path: '/systemSetting/OtherSetting',
        //   name: 'OtherSetting',
        //   component: () => import('@/views/systemSetting/OtherSetting'),
        //   meta: { title: '其他设置' }
        // },
        
        //系统用户管理        
        // {
        //   path: '/systemUser/systemUserManage',
        //   name: 'systemUserManage',
        //   component: () => import('@/views/systemUser/systemUserManage'),
        //   meta: { title: '系统用户管理' }
        // },
        
        //网站信息配置
        // {
        //   path: '/system/system',
        //   name: 'system',
        //   component: () => import('@/views/system/system'),
        //   meta: { title: '网站信息配置' }
        // }
      ]
    }
  ]
})
