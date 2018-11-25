<template>
  <div class="comment-container">
    <button @click="githubLogin">Github</button>
  </div>

</template>

<script>
import { githubLogin, getUserInfo } from '@/api/github'
export default {
  created () {
    this.getUserInfo()
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
    },
    async getUserInfo () {
      const code = this.getUrlData('code') || ''
      if (code === '') {
        return
      }

      await getUserInfo(code)
    }

  }
}
</script>

<style scoped>
</style>
