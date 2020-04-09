<template>
  <div class="signup">
    <div class="signup__bg" />
    <div class="signup__form-cn">
      <div class="signup__form">
        <div class="signup__title">欢迎注册汪乐的个人网站</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="是男是女" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
            <span class="signup__gender-note">选择后无法修改</span>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="ruleForm.confirmPassword" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="authCode">
            <div class="signup__auth-code">
              <el-input style="width: 100px" v-model="ruleForm.authCode" placeholder="验证码"></el-input>
              <div class="signup__auth-code-img" v-html="authCodeImg" />
              <a @click="generateAuthCode">换一张</a>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="submitForm('ruleForm')"
              :loading="signupLoading"
            >注册</el-button>
          </el-form-item>

          <el-form-item class="signup__btn">
            <div class="signup__other-info">
              <span>
                有账号？
                <a @click="$router.push('/login')" class="signup__other-info-item">直接登录</a>
              </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { generateAuthCode, signup } from '@/api/user'

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
        authCode: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名或者邮箱', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      signupLoading: false,
      authCodeImg: ''
    }
  },

  methods: {
    ...mapActions(['GENERATE_AUTH_CODE']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signup()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async generateAuthCode() {
      try {
        const res = await generateAuthCode()
        if (res.data.code === 0) {
          this.authCodeImg = res.data.data.authCode
        }
      } catch (e) {
        this.$message.error('请求出错了')
      }
    },
    async signup() {
      this.signupLoading = true
      const { name, gender, email, password, authCode } = this.ruleForm
      try {
        await signup({
          name,
          gender,
          email,
          password,
          authCode
        })
        // if (res.data.code === 0) {
        //
        // }
        this.$router.push('/activation')
        this.signupLoading = false
      } catch (e) {
        this.$message.error('请求出错')
        this.signupLoading = false
      }
    }
  },
  mounted() {
    this.generateAuthCode()
  }
}
</script>
<style lang="scss">
.signup {
  height: 100vh;
  position: relative;
  &__bg {
    background: url('../../assets/signup.jpeg') no-repeat;
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
    top: 0;
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
  &__auth-code {
    display: flex;
    align-items: center;
  }
  &__auth-code-img {
    margin: 10px 10px 0;
  }
  &__gender-note {
    margin-left: 20px;
  }

  &__other-info-item {
    color: #409eff;
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
