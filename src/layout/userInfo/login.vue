<template>
  <div class="login">
    <div class="login__title">欢迎登录</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="40px">
      <el-form-item label="邮箱" prop="email" class="login__label">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="login__label">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%;background-color:#006666;border-color:#006666"
          type="primary"
          @click="submitForm('form')"
        >登录</el-button>
      </el-form-item>
      <el-form-item class="login__btn">
        <div class="login__other-info">
          <span>
            没有账户？
            <a @click="$emit('toggle')" class="login__other-info-item">立即注册</a>
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
      form: {
        email: '',
        password: '',
        remember: false
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false
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
      this.loading = true
      try {
        const { email, password } = this.form
        const res = await this.LOGIN({ email, password })
        if (res.data.code === 0) {
          this.$message.success('登录成功')
          this.$emit('success')
          this.$router.push('/')
        } else if (res.data.code === 'user_010') {
          this.$message.error('账户名或密码错误')
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.$message.error('请求出错')
      }
    },
    resetForm() {
      this.$refs.form.resetFields()
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
  width: 80%;
  &__title {
    text-align: center;
    font-size: 26px;
    margin-bottom: 20px;
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
