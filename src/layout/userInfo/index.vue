<template>
  <div class="user-info">
    <a @click="loginVisible=true" class="user-info__login">登录</a>
    |
    <a @click="signupVisible=true" class="user-info__signup">注册</a>
    <el-dialog
      append-to-body
      :visible="loginVisible || signupVisible"
      width="30%"
      @close="onDialogClose"
    >
      <Login v-show="loginVisible" />
      <Signup v-show="signupVisible" />
    </el-dialog>
  </div>
</template>
<script>
import Login from './login'
import Signup from './signup'
export default {
  data() {
    return {
      loginVisible: false,
      signupVisible: false
    }
  },
  components: {
    Login,
    Signup
  },
  created() {},
  methods: {
    goToLoginPage() {
      this.$router.push('/login')
    },
    goToSignupPage() {
      this.$router.push('/signup')
    },
    onDialogClose() {
      if (this.loginVisible) {
        this.loginVisible = false
      } else {
        this.signupVisible = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info {
  color: white;
  &__login {
    color: white;
    font-size: 12px;
  }
  &__signup {
    color: white;
    font-size: 12px;
  }
}
</style>
