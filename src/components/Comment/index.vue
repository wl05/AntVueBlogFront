<template>
  <!--<div class="comment-container">-->
  <!--<ant-gitment id="comments" :options="options" v-if="options"></ant-gitment>-->
  <!--</div>-->
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
  // data () {
  //   return {
  //     options: {
  //       id: this.title,
  //       owner: 'antbaobao',
  //       repo: 'AntBlogComments',
  //       oauth: {
  //         client_id: 'ccaff36e451494dd4e12',
  //         client_secret: '52301845a8d314b57fdfd99fe37f2c8b46550a5e'
  //       },
  //       theme: {
  //         render (state, instance) {
  //           const container = document.createElement('div')
  //           container.lang = 'zh-CH'
  //           container.className = 'gitment-container gitment-root-container'
  //
  //           // your custom component
  //           container.appendChild(instance.renderSomething(state, instance))
  //           container.appendChild(instance.renderHeader(state, instance))
  //           container.appendChild(instance.renderEditor(state, instance))
  //           container.appendChild(instance.renderComments(state, instance))
  //           // container.appendChild(instance.renderFooter(state, instance))
  //           return container
  //         },
  //         renderSomething (state, instance) {
  //           const container = document.createElement('div')
  //           container.lang = 'zh-CH'
  //           if (state.user.login) {
  //             container.innerText = `你好, ${state.user.login}`
  //           }
  //           return container
  //         }
  //       }
  //     }
  //   }
  // },
  mounted () {
    var gitalk = new Gitalk({
      // gitalk的主要参数
      clientID: `ccaff36e451494dd4e12`,
      clientSecret: `52301845a8d314b57fdfd99fe37f2c8b46550a5e`,
      repo: `AntBlogComments`,
      owner: 'antbaobao',
      admin: [ 'antbaobao' ],
      id: `${this.$route.params.id}`,
    })
    gitalk.render(document.getElementById('gitalk-container'))
  }
}
</script>

<style scoped>

</style>
