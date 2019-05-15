<template>
  <el-container class="top-container">
    <Header/>
    <el-container ref="el-container" class="content-el-container">
      <el-main>
        <div class="content-container">
          <router-view/>
        </div>
        <Sider/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import Header from './Header/Header.vue'
import Sider from './sider/index.vue'
import Footer from './Footer.vue'

export default {
  name: 'Layout',
  data () {
    return {
      headroom: null,
      show: false,
      timer: null
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
    /*background: url("../assets/bgs/17.jpg");*/
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    color: #333333;
    overflow: scroll;
    height: 100vh;
    background-color: #f5f5d5;
  }

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
    .content-container {
      flex: 1;
    }
  }

  .el-footer {
    background: rgba(0, 0, 0, 0.9);
  }
</style>
