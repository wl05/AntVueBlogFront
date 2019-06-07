<template>
  <article class="markdown-body" v-html="htmlValue">
  </article>
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
}
</script>
