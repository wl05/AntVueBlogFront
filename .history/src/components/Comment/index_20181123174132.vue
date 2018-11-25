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
    },
    getUrlData: function (name) {
            		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				var r = window.location.search.substr(1).match(reg)
				if (r != null)
        {return unescape(r[2]);}
      return null
            }

  }
}
</script>

<style scoped>
</style>
