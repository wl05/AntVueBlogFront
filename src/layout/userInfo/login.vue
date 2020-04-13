<template>
  <div class="login">
    <div class="login__title">欢迎登录</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="40px">
      <el-form-item label="邮箱" prop="email" class="login__label">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="login__label">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="下次自动登录"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%;background-color:#006666;border-color:#006666"
          type="primary"
          @click="submitForm('ruleForm')"
        >登录</el-button>
      </el-form-item>
      <el-form-item class="login__btn">
        <div class="login__other-info">
          <span>
            没有账户？
            <a @click="$router.push('/signup')" class="login__other-info-item">立即注册</a>
          </span>
          <a class="login__other-info-item">忘记密码？</a>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    ...mapActions(['LOGIN']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        }
      })
    },
    async login() {
      try {
        const { email, password } = this.ruleForm
        const res = await this.LOGIN({ email, password })
        console.log(res)
        if (res.data.code === 0) {
          this.$message.success('登录成功')
          this.$router.push('/')
          this.$$emit('success')
        }
      } catch (e) {
        this.$message.error('请求出错')
      }
    }
  }
}
</script>
<style lang="scss">
.login {
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: none;
  }

  .el-form-item.is-success .el-input__inner {
    border-color: #d1d5da;
  }

  .el-form-item.is-error .el-input__inner {
    border-color: #d1d5da;
  }
}
</style>
<style lang="scss" scope>
.login {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &__title {
    text-align: center;
    color: #006666;
    font-size: 26px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  &__btn {
    margin: 0;
  }
  &__other-info {
    display: flex;
    justify-content: space-between;
  }
  &__other-info-item {
    color: #006666;
  }
}
</style>
