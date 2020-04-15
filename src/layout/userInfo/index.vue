<template>
  <div class="user-info">
    <el-dropdown @command="onCommand" v-if="userInfo" trigger="click">
      <span class="user-info__name">
        {{userInfo.name}}
        <i class="el-icon-arrow-down el-icon--right" style="color: white"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-else>
      <a @click="loginVisible=true" class="user-info__login">登录</a>
      |
      <a @click="signupVisible=true" class="user-info__signup">注册</a>
    </div>
    <el-dialog
      append-to-body
      :visible="loginVisible || signupVisible"
      width="30%"
      @close="onDialogClose"
      align="center"
    >
      <Login
        v-show="loginVisible"
        @success="onLoginSuccess"
        @toggle="()=>{loginVisible=false;signupVisible=true}"
      />
      <Signup
        v-show="signupVisible"
        @success="onSignupSuccess"
        @toggle="()=>{loginVisible=true;signupVisible=false}"
      />
    </el-dialog>
  </div>
</template>
<script>
import Login from './login'
import Signup from './signup'
import { mapActions } from 'vuex'
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
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  created() {
    this.GET_USER_INFO()
  },
  methods: {
    ...mapActions(['GET_USER_INFO']),
    onDialogClose() {
      if (this.loginVisible) {
        this.loginVisible = false
      } else {
        this.signupVisible = false
      }
    },
    onSignupSuccess() {
      this.signupVisible = false
      this.loginVisible = true
    },
    onLoginSuccess() {
      this.loginVisible = false
      this.GET_USER_INFO()
    },
    logout() {
      localStorage.removeItem('token')
      location.reload()
    },
    onCommand(val) {
      if (val === '1') {
        this.logout()
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
  &__name {
    font-size: 12px;
    color: white;
    cursor: pointer;
  }
}
</style>
