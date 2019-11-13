<template>
  <div id="app">
    <!-- 挂载 顶部 topbar 左侧 nav 中间 layout 主体 -->
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  // created() {
  //   if (localStorage.token) {
  //     this.$store.commit('LOGIN_IN', { token: localStorage.token })
  //   } else {
  //     this.$router.push('/login')
  //   }
  // }
}
</script>

<style>
</style>
