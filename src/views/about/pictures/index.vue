<template lang="html">
  <div class="container">
    <a class="img-container"  v-for="n in count" :key="n" >
      <img class="img" width="50%" height="50%" :src="getImgSrc(n+1)" alt="hello"/>
    </a>
  </div>
</template>
<script>
import getImgurl from '@/utils/getImgUrl'

export default {
  data () {
    return {
      count: 7
    }
  },
  methods: {
    getImgSrc (index) {
      return getImgurl(`myownpictrues/${index}.png`)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    .img-container{
      overflow: hidden;
      .img {
        border-radius: 3px;
        padding: 5px;
        background-color: white;
        margin: 10px;
        box-shadow: #d1d5da;
        box-shadow: 0px 2px 5px #888888;
        transition: height 0.5s;
        transition: width 0.5s;
        float: left;
        right: 0;
        display: block;
      }
    }

    .img:hover {
      cursor: pointer;
      width: 55%;
      height: 55%;
      box-shadow: 2px 5px 5px #888888;
    }
  }
</style>
