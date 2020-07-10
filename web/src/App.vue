<template>
  <div id="app">
    <router-view />
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
