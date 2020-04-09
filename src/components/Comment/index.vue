<template>
  <div id="gitalk-container"></div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    const Gitalk = window.Gitalk
    var gitalk = new Gitalk({
      // gitalk的主要参数
      clientID: `ccaff36e451494dd4e12`,
      clientSecret: `52301845a8d314b57fdfd99fe37f2c8b46550a5e`,
      repo: `AntBlogComments`,
      owner: 'antbaobao',
      admin: ['antbaobao'],
      id: `${this.$route.params.id}`
    })
    gitalk.render(document.getElementById('gitalk-container'))
  }
}
</script>

<style scoped>
</style>
