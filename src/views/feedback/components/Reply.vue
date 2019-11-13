<template>
  <el-dialog title="请输入回复内容"
    :visible.sync="centerDialogVisible"
    :close-on-click-modal="false"
    width="30%"
    @close="close"
    center>
    <el-input type="textarea"
      :rows="5"
      :minlength="8"
      :clearable="true"
      placeholder="请输入回复内容"
      v-model="replyText">
    </el-input>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary"
        @click="submit(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      centerDialogVisible: true,
      replyText: ''
    }
  },
  methods: {
    close() {
      this.centerDialogVisible = false
      this.$emit('close')
    },
    submit(update) {
      if (this.replyText.length > 0) {
        this.$http
          .post('/api/Suggestion/Reply', {
            id: this.item.id,
            reply: this.replyText
          })
          .then(res => {
            if (res.success) {
              this.$message({
                message: '回复成功',
                type: 'success'
              })
              this.$emit('close', update)
            }
          })
      } else {
        this.$message({
          message: '回复内容不能为空！',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

