<template>
  <el-dropdown v-bind="$attrs">
    <span class="el-dropdown-link">
      {{ selectLabel || placeholder }}<i class="el-icon-arrow-down"></i>
    </span>

    <el-dropdown-menu slot="dropdown"
      ref="el-dropdown-menu"
      @select="select">
      <slot></slot>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: [String, Number],
      default: '请选择'
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    }
  },

  data() {
    return {
      selectLabel: ''
    }
  },

  watch: {
    value(val) {
      this.setLabel(val)
    }
  },

  methods: {
    select({ value, label }) {
      this.$emit('input', value)
      this.$emit('change', { value, label })
    },

    setLabel(val) {
      for (let item of this.$refs['el-dropdown-menu'].$children) {
        if (item.value === val) {
          this.selectLabel = item.label
          break
        }
      }
    }
  },

  mounted() {
    this.setLabel(this.value)
  }
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  user-select: none;
  color: #409eff;
}
</style>
