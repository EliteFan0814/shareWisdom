<template>
  <div>
    <el-dialog @close="close"
      title="重置密码"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      width="500px"
      class="btnbox">
      <el-tabs v-model="activeName"
        type="card">
        <el-tab-pane label="重置登录密码"
          name="first">
          <el-form :model="form"
            ref="form"
            :rules="rules"
            label-position="right"
            label-width="80px">
            <el-form-item label="登录密码"
              prop="newPwd">
              <el-input class="inp"
                v-model="form.newPwd"
                type="password"
                placeholder="请输入新的登录密码"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="重置支付密码"
          name="second">
          <el-form :model="form2"
            ref="form2"
            :rules="rules2"
            label-position="right"
            label-width="80px">
            <el-form-item label="支付密码"
              prop="newPayPwd">
              <el-input class="inp"
                v-model="form2.newPayPwd"
                type="password"
                placeholder="请输入新的支付密码"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-button slot="footer"
        type
        @click="close">取消</el-button>
      <el-button slot="footer"
        type="primary"
        @click="edit()">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['item'],
  created() {},
  data() {
    return {
      activeName: 'first',
      isDialog: true,
      newPwdPass: false,
      newPayPwdPass: false,
      form: {
        newPwd: ''
      },
      form2: {
        newPayPwd: ''
      },
      rules: {
        newPwd: [
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          // { required: false, message: '请输入新的登陆密码', trigger: 'blur' },
        ]
      },
      rules2: {
        newPayPwd: [
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          // { required: false, message: '请输入新的支付密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    edit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        if (this.form.newPwd) {
          this.$http
            .post('/api/Login/ResetPwd', {
              UserId: this.item.id,
              NewPwd: this.form.newPwd
            })
            .then(res => {
              if (res.success) {
                this.$message({
                  message: '恭喜你，重置登陆密码成功',
                  type: 'success'
                })
              }
            })
        }
      })
      this.$refs.form2.validate(valid => {
        if (!valid) return
        if (this.form2.newPayPwd) {
          this.$http
            .post('/api/Login/ResetPayPwd', {
              UserId: this.item.id,
              NewPwd: this.form.newPayPwd
            })
            .then(res => {
              if (res.success) {
                this.$message({
                  message: '恭喜你，重置支付密码成功',
                  type: 'success'
                })
              }
            })
        }
      })
      if (this.form.newPwd.length >= 8 || this.form2.newPayPwd.length >= 8) {
        this.$emit('close', '1')
      } else {
        this.$message({
          message: '请输入符合条件的密码！',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style scoped>
.inp {
  width: 95%;
}
.btnbox {
  text-align: center;
}
.btn {
  display: inline-block;
  width: 70%;
}
.btn.pay {
  position: relative;
  margin-left: -3px;
}
.btn:nth-of-type(2) {
  margin-top: 10px;
}
</style>

