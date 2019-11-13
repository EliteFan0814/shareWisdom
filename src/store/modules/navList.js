const navList = {
  state: {
    list: [{
        title: '账号信息',
        index: '/',
        icon: require('@/assets/-svg/home.svg'),
      },
      // 用工信息
      {
        title: '用工信息',
        index: '/sharewisdominfo/EmployInfo',
        icon: require('@/assets/-svg/employinfo.svg')
      },
       // 外协信息
      {
        title: '外协信息',
        index: '/sharewisdominfo/ExternalInfo',
        icon: require('@/assets/-svg/externalinfo.svg')
      },
       // 服务信息
      {
        title: '服务信息',
        index: '/sharewisdominfo/ServiceInfo',
        icon: require('@/assets/-svg/serviceinfo.svg')
      }

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
    ]
  }
}

export default navList