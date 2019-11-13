<template>
  <el-dialog :title="item.name"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    :center="true"
    @close="close">
    <el-form label-position="left"
      label-width="120px"
      :model="form"
      ref="form"
      :rules="rules">
      <el-form-item label="请输入新密码"
        prop="pwd">
        <el-input class="inp"
          v-model="form.pwd" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
        @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      dialogVisible: true,
      form: {
        pwd: ''
      },
      rules: {
        pwd: [
          {
            required: true,
            message: '密码不能为空'
          },
          {
            min: 6,
            max:16,
            message: '请输入6到16位密码'
          }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('userid', this.item.id)
        params.append('newPwd', this.form.pwd)
        this.$http.post('/api/SystemUser/ResetPwd', params).then(res => {
          if (!res.errCode) {
            this.$emit('close', '1')
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.inp {
  width: 90%;
}
</style>