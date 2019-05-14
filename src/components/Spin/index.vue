<template>
  <div class="spin-container" :style="`height:${height}px`">
    <i class="el-icon-loading" size="large"></i>
  </div>

</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 200
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
