<template>
  <el-dropdown-item v-bind="$attrs"
    @click.native="handleClick">{{ label }}</el-dropdown-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '选项'
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    }
  },

  methods: {
    handleClick() {
      this.$parent.$emit('select', {
        label: this.label,
        value: this.value
      })
    }
  }
}
</script>

<style>
</style>
