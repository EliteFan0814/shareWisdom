import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import tagsView from '@/store/modules/tagsView'
import navList from '@/store/modules/navList'
import {
  getCookie,
  setCookie,
  delCookie
} from '../utils/cookie'
Vue.use(Vuex)

let token = getCookie('token')
let isLogin = token ? true : false

export default new Vuex.Store({
  state: {
    username: '',
    userGrade: '',
    token: token,
    isLogin: isLogin,
    isNavShrink: false,
  },
  
  getters: {
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    navList: state => state.navList.list
  },

  mutations: {
    SET_USER_NAME(state, {
      userName = ''
    }) {
      state.username = userName
    },
    LOG_IN(state, {
      token = ''
    }) {
      state.isLogin = true
      state.token = token
      setCookie('token', token, 10)
    },
    LOG_OUT(state) {
      state.isLogin = false
      state.token = ''
      delCookie('token')
      router.push("/login")
    },
    // 导航 展开/收缩
    SCROLL_NAV(state) {
      state.isNavShrink = !state.isNavShrink
    }
  },

  actions: {},

  modules: {
    tagsView,
    navList
  }
})