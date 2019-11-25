<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      :rules="rules"
      label-position="left"
    >
      <!-- <h3 class="title">{{$config.logintitle}}</h3> -->
      <img src="../icons/png/logo.png" />
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Login",
  created() {},
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },

      loading: false,
      pwdType: "password",

      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    // 相当于把 this.LOG_IN 映射为 this.$store.commit('LOG_IN')
    ...mapMutations(["SET_USER_NAME","LOG_IN"]),

    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.login();
        } else {
          return false;
        }
      });
    },

    login() {
      this.$http
        .post("/base/pub/login", {
          account: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(res => {
          // this.$store.state.username = this.loginForm.username;
          this.SET_USER_NAME({userName:this.loginForm.username})
          if (res.code) {
            this.LOG_IN({
              token: res.data.token
            });
            this.$router.push("/");
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$router.push("/login");
        });

      //this.$store.state.username = this.loginForm.username;
      // this.$router.push({
      //   path:"/",
      //   query: {
      //     data:this.loginForm.username
      //     }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
$bg: #2d3a4b;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow-y: auto;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    min-height: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
img {
  margin: 20px 30% 40px 29%;
  width: 200px;
  // height: 60px;
}
.login-container {
  /deep/ .el-input {
    height: 47px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  /deep/ .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
