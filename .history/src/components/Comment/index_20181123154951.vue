<template>
    <div class="comment-container">
       <button @click="githubLogin">Github</button>
    </div>

</template>

<script>
import {githubLogin} from '@/api/github'
export default {
  methods: {
    async githubLogin () {
      const res = await githubLogin()
      window.location = res.data.data
    }
  }
}
</script>

<style scoped>
    .spin-container {
    }
</style>
