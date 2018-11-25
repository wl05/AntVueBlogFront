<template>
    <div class="comment-container">
       <button @click="githubLogin">Github</button>
    </div>

</template>

<script>
import githubLogin from '@/api/githubLogin'
export default {
  methods: {
    async githubLogin () {

    }
  }
}
</script>

<style scoped>
    .spin-container {
    }
</style>
