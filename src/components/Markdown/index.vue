<template>
  <div class="markdown-body" v-html="htmlValue">
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
  }
}
</script>
