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
      clientID: `b9b1dfe359b428ab3ec6`,
      clientSecret: `eec74a37d203a51119384ca8c4e6c79d11b91fa5`,
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
