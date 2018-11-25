<template>
    <div class="comment-container">
       <button @click="githubLogin">Github</button>
    </div>

</template>

<script>

export default {
  methods: {
    githubLogin () {
      // https://github.com/login/oauth/authorize?client_id=myclient_id&scope=user:email

    }
  }
}
</script>

<style scoped>
    .spin-container {
    }
</style>
