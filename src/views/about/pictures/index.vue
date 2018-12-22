<template lang="html">
  <div class="container" ref="container">
    <div class="img-container" v-for="n in count" :key="n">
      <img class="img" :src="getImgSrc(n+1)" alt="hello"/>
    </div>
  </div>
</template>
<script>
import getImgurl from '@/utils/getImgUrl'

export default {
  data () {
    return {
      count: 18
    }
  },
  methods: {
    getImgSrc (index) {
      return getImgurl(`myownpictrues/${index}.png`)
    }
  },
  mounted () {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-container {
      width: auto;
      display: flex;
      width: 400px;
      height: 430px;
      overflow: hidden;
      padding: 4px;
      background-color: white;
      border-radius: 3px;
      margin: 30px;
      box-shadow: 0px 5px 5px #ddd;
      transition: box-shadow 1s;
      .img {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        transition: transform 1s;
      }
      .img:hover {
        transform: scale(1.5, 1.5);
      }
    }
    .img-container:hover {
      box-shadow: 5px 10px 10px #888888;
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      .img-container {
        /*width: 100%;*/
        /*height: 430px;*/
        /*margin: 20px 0;*/
      }
    }
  }
</style>
