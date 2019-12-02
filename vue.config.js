module.exports = {
  // 站点路径
  publicPath: process.env.NODE_ENV === 'development' ? '' : '',

  // 资源路径
  assetsDir: 'static',

  // 代理跨域
  devServer: {
    // 目标服务器
    // proxy: 'http://zaihe.demo2.dx623.com'
    proxy: 'myssl.dx623.com'

  },

  // js source-map
  productionSourceMap: false
}
