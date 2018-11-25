<template>
    <div class="comment-container">
       <button @click="githubLogin">Github</button>
    </div>

</template>

<script>
import githubLogin from '@/api/github'
export default {
  methods: {
    async githubLogin () {
      githubLogin()
    }
  }
}
</script>

<style scoped>
    .spin-container {
    }
</style>
