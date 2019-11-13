const navList = {
  state: {
    list: [
      {
        title: '首页',
        index: '/',
        icon: require('@/assets/-svg/home.svg'),
      },

      // 信息管理
      {
        title: '信息管理',
        index: '/mallManage',
        icon: require('@/assets/-svg/business.svg'),
        children: [
          {
            title: '用工信息',
            index: '/mallManage/CarouselSet',
          },
          {
            title: '外协信息',
            index: '/mallManage/GoodsManage',
          },
          {
            title: '服务信息',
            index: '/orderManage/RetailOrder',
          }
        ]
      },
 
      // 订单管理
      // {
      //   title: '订单管理',
      //   index: '/orderManage',
      //   icon: require('@/assets/-svg/order.svg'),
      //   children: [
      //     {
      //       title: '零售订单',
      //       index: '/orderManage/RetailOrder',
      //     },
      //     {
      //       title: '批发订单',
      //       index: '/orderManage/WholesaleOrder',
      //     },
      //   ]
      // },

      // 寄售队列
      // {
      //   title: '寄售队列',
      //   index: '/consignment/Consignment',
      //   icon: require('@/assets/-svg/goods.svg'),
      // },

      // 会员管理
      // {
      //   title: '会员管理',
      //   index: '/member',
      //   icon: require('@/assets/-svg/member.svg'),
      //   children: [
      //     {
      //       title: '会员列表',
      //       index: '/member/MemberList',
      //     },
      //     {
      //       title: '团队图谱',
      //       index: '/member/TeamMap',
      //     },
      //     {
      //       title: '系统充值记录',
      //       index: '/member/RechargeRecord',
      //     },
      //   ]
      // },
      // {
      //   title: '提现管理',
      //   index: '/withdrawData/WithdrawData',
      //   icon: require('@/assets/-svg/business.svg'),
      // },
      // {
      //   title: '文章管理',
      //   index: '/article',
      //   icon: require('@/assets/-svg/article.svg'),
      //   children: [
      //     {
      //       title: '常见问题',
      //       index: '/article/CommonProblem',
      //     },
      //     {
      //       title: '平台公告',
      //       index: '/article/platformPlacard',
      //     },
      //     {
      //       title: '用户协议',
      //       index: '/article/RegistAgreement',
      //     },
          
      //     {
      //       title: '使用帮助',
      //       index: '/article/UsingHelp',
      //     },
      //     {
      //       title: '关于我们',
      //       index: '/article/AboutUs',
      //     },
      //   ]
      // },
      // {
      //   title: '意见反馈',
      //   index: '/feedback/Feedback',
      //   icon: require('@/assets/-svg/order.svg'),
      // },
      // {
      //   title: '系统设置',
      //   index: '/systemSetting',
      //   icon: require('@/assets/-svg/system.svg'),
      //   children: [
      //     {
      //       title: '期次配置',
      //       index: '/systemSetting/PeriodSetting',
      //     },
      //     {
      //       title: '芝麻粒设置',
      //       index: '/systemSetting/ZhimaliSetting',
      //     },
      //     {
      //       title: '优惠券设置',
      //       index: '/systemSetting/CouponSetting',
      //     },
      //     {
      //       title: '奖金设置',
      //       index: '/systemSetting/BonusSetting',
      //     },
      //     {
      //       title: '其他设置',
      //       index: '/systemSetting/OtherSetting',
      //     },
      //   ]
      // },
      // {
      //   title: '系统用户管理',
      //   index: '/systemUser/systemUserManage',
      //   icon: require('@/assets/-svg/agent.svg'),
      // },
      
      // {
      //   title: '网站信息配置',
      //   index: '/system/system',
      //   icon: require('@/assets/-svg/system.svg'),
      // }
    ]
  }
}

export default navList
