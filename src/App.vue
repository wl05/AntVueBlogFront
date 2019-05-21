<template>
  <div id="app">
    <Layout/>
  </div>
</template>

<script>
import Layout from '@/layout'
import FastClick from 'fastclick'

FastClick.attach(document.body)
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>
