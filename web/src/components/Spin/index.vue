<template>
  <div class="spin-container" :style="`height:${height}px`">
    <i class="el-icon-loading" :style="`font-size: ${size}px`"></i>
  </div>

</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 200
    },
    size: {
      type: Number,
      default: 24
    }
  }

}
</script>

<style scoped>
  .spin-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    /*min-height: 400px;*/
  }
</style>
