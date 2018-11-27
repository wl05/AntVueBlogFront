<template>
  <div class="container" ref="particles">
    <el-container>
      <transition
        appear
        appear-active-class="animated fadeIn"
      >
        <el-header v-if="true" id="header" ref="header">
          <Header/>
        </el-header>
      </transition>
      <el-container ref="el-container" class="content-el-container">
        <el-main>
          <!--<button @click="show=true"></button>-->
          <div class="content-container">
            <router-view/>
          </div>
        </el-main>
        <!--<el-footer>-->
        <!--<Footer/>-->
        <!--</el-footer>-->
      </el-container>
    </el-container>
  </div>

</template>

<script>
import Header from './Header.vue'
import Sider from './Sider.vue'
import Footer from './Footer.vue'
// import '@/utils/headroom'

export default {
  name: 'Layout',
  data () {
    return {
      headroom: null,
      show: false,
      timer: null
    }
  },
  beforeDestroy () {
    // this.headroom.destroy()
  },
  mounted () {
    // window.headroom(this.$refs.header)
  },
  components: {
    Header,
    Sider,
    Footer
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .el-header {
    padding: 0;
    background: rgba(0, 0, 0, 0.55);
    width: 100%;
    position: fixed;
    z-index: 10000;
    color: rgba(0, 0, 0, 1);
    height: auto;
  }

  .el-main {
    padding: 0;
  }

  .el-footer {
    background: rgba(0, 0, 0, 0.9);
  }

  .header-transition-enter {
    /*display: none;*/
  }
</style>
