<template>
  <div class="no-data">
    {{text}}
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
  .no-data {
    padding-left: 15px;
    font-size: 24px;
    min-height: 200px;
    line-height: 200px;
  }
</style>
