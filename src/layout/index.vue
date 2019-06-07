<template>
  <el-container class="top-container">
    <Header/>
    <!--<img :src="banner" height="800px"/>-->
    <el-container ref="el-container" class="top-container__content-el-container">
      <el-main>
        <div class="top-container__content-container">
          <router-view/>
        </div>
        <Sider/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import Header from './Header.vue'
import Sider from './sider/index.vue'
import Footer from './Footer.vue'
import banner from '@/assets/banner.jpeg'

export default {
  name: 'Layout',
  data () {
    return {
      headroom: null,
      show: false,
      timer: null,
      banner
    }
  },
  components: {
    Header,
    Sider,
    Footer
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .top-container {
    display: flex;
    flex-direction: column;
    color: #333333;
    overflow: scroll;
    height: 100vh;
    background-color: #EEEEEE;
    .el-header {
      padding: 0;
      width: 100%;
      color: #333333;
      height: auto;
    }
    .el-main {
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &__content-container {
      flex: 1;
    }
    .el-footer {
      background: rgba(0, 0, 0, 0.9);
    }
    @media screen and (max-width: 960px) {
      &__content-container {
        padding-top: 50px;
      }
    }
  }
</style>
