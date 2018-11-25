<template>
  <div class="comment-container">
    <button @click="githubLogin">Github</button>
  </div>

</template>

<script>
import { githubLogin, getUserInfo } from '@/api/github'
export default {
  created () {
    const code = this.getUrlData('code') || ''
    if (code === '') {
      return
    }

    getUserInfo
    this.$http.get('https://api.hgdqdev.cn/api/github/user_info',
      {
        params: {
          code: code
        }
      }
    ).then((response) => {
      if (response.data.status == 100) {
        this.ruleForm.username = response.data.data.login
      } else {

      }
    }, (response) => {
    })
  },
  methods: {
    async githubLogin () {
      const res = await githubLogin()
      window.location = res.data.data
    },
    getUrlData (name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      const r = window.location.search.substr(1).match(reg)
      if (r != null) { return unescape(r[2]) }
      return null
    }

  }
}
</script>

<style scoped>
</style>
