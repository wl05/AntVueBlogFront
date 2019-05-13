<template>
  <div class="class-container">
    <article class="markdown-body" id="write" ref="content">
    </article>
  </div>

</template>

<script>
import VueMarkdown from 'vue-markdown'

import './style.css'
import 'github-markdown-css'
import './cover.css'

export default {
  props: {
    htmlValue: {
      type: String,
      required: true
    }
  },
  components: {
    VueMarkdown
  },

  mounted () {
    this.$refs.content.innerHTML = this.htmlValue
  },
  watch: {
    htmlValue () {
      this.$refs.content.innerHTML = this.htmlValue
    }
  }
}
</script>

<style scoped>
  .class-container {
    padding: 15px;
  }
</style>
