<template>
    <div class="comment-container">
       <button @click="githubLogin">Github</button>
    </div>

</template>

<script>
import axios from 'axios'
export default {
  methods: {
    async githubLogin () {
      // https://github.com/login/oauth/authorize?client_id=myclient_id&scope=user:email
      const res = await axios({
        url: 'https://github.com/login/oauth/authorize?client_id=ccaff36e451494dd4e12&scope=user:email',
        method: 'get'
      })
      console.log(res)
    }
  }
}
</script>

<style scoped>
    .spin-container {
    }
</style>
