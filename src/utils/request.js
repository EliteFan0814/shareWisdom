import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import Qs from 'qs'
import {
  Message
} from 'element-ui'
import {
  getCookie,
  setCookie
} from './cookie.js'

const request = axios.create({
  // 仅在开发环境走代理
  baseURL:'/'
})

request.interceptors.request.use(
  config => {
    if (config.method == "post") {
      if (!(config.data instanceof FormData)) {
        config.data = Qs.stringify(config.data)
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
    }
    // 登录后所有请求附带token
    if (store.state.isLogin && store.state.token) {
      // config.headers.token = store.state.token
      config.headers = {
        Authorization: 'Bearer ' + getCookie('token'),
        ...config.headers
      }
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  res => {
    if (res.data.success || res.data.code === 1) {
      // successcess
      if (res.data.msg && res.data.msg != "ok") Message.success(res.data.msg)
    }
    if (res.data.code === 0) {
      Message.error(res.data.msg)
    }

    if (res.data.success || res.data.code === 1) return res.data
    return Promise.reject(res.data)
  },
  err => {
    // token 失效

    if (err.response) {
      if (err.response.status === 401) {
        Message.error('请重新登陆')
        store.commit('LOG_OUT')
        router.push('/login')
      }
      if (err.response.status === 403) {
        Message.error('没有操作权限')
      }
      if (err.response.status === 400) {
        if (err.response.data && err.response.data.message)
          Message.error(err.response.data.message)
        else {
          Message.error(JSON.stringify(err.response.data))
        }
      }
    }
    // Message.error('网络错误，请重试')


    return Promise.reject(err)
  }
)

Vue.prototype.$http = request

export default request