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
      clientID: `23414a6ccd2eb016b5db`,
      clientSecret: `f5e7f18cde592d1b1195d94f6579d667ad1196ef`,
      repo: `ant-blog-comments`,
      owner: 'antbaobao',
      admin: ['antbaobao'],
      id: `${this.$route.params.id}`,
      distractionFreeMode: false
    })
    gitalk.render(document.getElementById('gitalk-container'))
  }
}
</script>

<style scoped>
</style>
