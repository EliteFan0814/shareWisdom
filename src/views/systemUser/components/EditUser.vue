<template>
  <el-dialog :title="item.name?'修改用户信息':'添加系统用户'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="600px"
    :center="true"
    @close="close">
    <el-form label-position="right"
      label-width="100px"
      :model="innerItem"
      ref="innerItem"
      :rules="rules">
      <el-form-item label="登录名："
        prop="loginName">
        <el-input class="inp"
          v-model="innerItem.loginName"></el-input>
      </el-form-item>
      <el-form-item label="昵称："
        prop="name">
        <el-input class="inp"
          v-model="innerItem.name"></el-input>
      </el-form-item>
      <el-form-item label="电话："
        prop="mobile">
        <el-input class="inp"
          v-model="innerItem.mobile"></el-input>
      </el-form-item>
      <el-form-item v-if="!innerItem.id"
        label="密码："
        prop="pwd">
        <el-input class="inp"
          type="password"
          v-model="innerItem.pwd"></el-input>
      </el-form-item>
      <!-- <el-form-item label="角色："
        prop="userTypeStr">
        <el-input class="inp"
          v-model="innerItem.userTypeStr"></el-input>
      </el-form-item> -->
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
      innerItem: {},
      rules: {
        name: [
          {
            required: true,
            message: '昵称不能为空'
          }
        ],
        loginName: [
          {
            required: true,
            message: '登录名不能为空'
          }
        ],
        mobile: [
          {
            required: true,
            message: '联系电话不能为空'
          }
        ],
        pwd: [
          { required: true, message: '密码不能为空' },
          { min: 6, max: 16, message: '请输入6到16位密码' }
        ],
        userTypeStr: [
          {
            required: true,
            message: '角色不能为空'
          }
        ]
      }
    }
  },
  created() {
    this.innerItem = JSON.parse(JSON.stringify(this.item))
  },
  // computed: {
  //   innerItem() {
  //     return this.item
  //   }
  // },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.$refs.innerItem.validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('loginName', this.innerItem.loginName)
        params.append('name', this.innerItem.name)
        params.append('mobile', this.innerItem.mobile)
        if (this.innerItem.id) {
          params.append('Id', this.innerItem.id)
          this.$http
            .post('/api/SystemUser/Modify', params)
            .then(res => {
              if (res.success) {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                })
                this.$emit('close', '1')
              }
            })
            .catch(res => {
              if (res.errCode) {
              }
            })
        } else {
          params.append('pwd', this.innerItem.pwd)
          this.$http.post('/api/SystemUser/Create', params).then(res => {
            if (res.success) {
              this.$message({
                message: '创建新用户成功！',
                type: 'success'
              })
              this.$emit('close', '1')
            }
          })
        }
        // this.dialogVisible = false
        // params.append('rolesStr', this.innerItem.userTypeStr)
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