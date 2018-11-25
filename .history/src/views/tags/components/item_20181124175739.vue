<template>
    <a class="tags-item-container"
       @click="$router.push({ path:`/tags/${item._id}` })"
    >
        {{item.name}}
    </a>
</template>

<script>

export default {
  props: [
    'item',
    'styles'
  ],
  data () {
    return {}
  },
  created () {
  },

  methods: {}
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
    .tags-item-container {
        border-bottom: 2px solid rgba(0, 0, 0, 0.6);
        cursor: pointer;
        margin: 15px;
        font-size: 18px;
    }
    .tags-item-container:hover {
        color: rgba(0, 0, 0, 0.9);
        border-bottom: 2px solid rgba(0, 0, 0, 0.9);
    }
</style>
