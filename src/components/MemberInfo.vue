<template>
  <div class="memberInfo">
    <img v-if="avatar"
      :src="avatar"
      alt>
    <img v-else
      src="@/assets/logo.png">
    <div class="mbInfoText">
      <span class="mbInfoName">{{name}}</span>
      <span class="mbInfoPosition">{{position}}</span>
      <span class="mbInfoMobile">{{phone}}</span>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['avatar','name','phone'],
  props: {
    avatar: {
      type: String
    },
    name: {
      type: String,
      default: 'name 未设置',
    },
    position:{
      type: String,
      default: 'position 未设置',
    },
    phone: {
      type: String,
      default: 'phone 未设置'
    }
  },
  name: 'memberInfo'
}
</script>

<style lang="scss" scoped>
.memberInfo {
  white-space: nowrap;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin: 0 5px;
  }
  .mbInfoText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>