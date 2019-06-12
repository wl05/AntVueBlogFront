<template>
  <div class="login">
    <div class="login__bg"/>
    <div class="login__form-cn">
      <div class="login__form">
        <div class="login__title">欢迎登录汪乐的个人网站</div>
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
            <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
          <el-form-item class="login__btn">
            <div class="login__other-info">
              <span>没有账户？ <a @click="$router.push('/signup')" class="login__other-info-item">立即注册</a></span>
              <a class="login__other-info-item">忘记密码？</a>
            </div>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      ruleForm: {
        email: '',
        password: ''

      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]

      }
    }
  },

  methods: {
    ...mapActions([ 'LOGIN' ]),
    submitForm (formName) {
      this.$refs[ formName ].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.login()

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login () {
      try {
        const {email, password} = this.ruleForm
        const res = await this.LOGIN({email, password})
        if (res.data.code === 0) {
          this.$message.success('登录成功')
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
        this.$message.error('请求出错')
      }

    }
  }
}
</script>
<style lang="scss">
  .login {
    height: 100vh;
    position: relative;
    &__bg {
      background: url("../../assets/login.jpeg") no-repeat;
      background-size: cover;
      height: 100vh;
    }
    &__title {
      text-align: center;
      color: #606266;
      font-size: 24px;
      margin-bottom: 20px;
    }
    &__form-cn {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      height: 100vh;
      width: 100vw;
      left: 0;
      top: 0
    }
    &__form {
      position: absolute;
      width: 400px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 40px;
    }
    &__btn {
      margin: 0;
    }
    &__other-info {
      display: flex;
      justify-content: space-between;
    }
    &__other-info-item {
      color: #409EFF;
    }
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
