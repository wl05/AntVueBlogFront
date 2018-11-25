<template>
    <div class="container" ref="particles">
        <el-container>
            <el-header id="header">
                <Header/>
            </el-header>
            <el-container ref="el-container" class="content-el-container">
                <el-main>
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

export default {
  name: 'Layout',
  data () {
    return {
      headroom: null
    }
  },
  methods: {},

  components: {
    Header,
    Sider,
    Footer
  },
  mounted () {

  },
  beforeDestroy () {

  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
    .el-header {
        padding: 0;
        background: rgba(255, 255, 255, 0.9);
        width: 100%;
        position: fixed;
        z-index: 10000;
        color: rgba(0, 0, 0, 1);
        height: auto;

    }

    .container {
        /*background: url("../assets/background.jpg") no-repeat;*/
        // background-size: 100% 100%;
        // height: 100vh;
        // overflow: scroll
    }

    .content-container {
        margin: 0 auto;
    }

    .el-main {
        padding: 0;
    }

    .el-footer {
        background: rgba(0, 0, 0, 0.6);
    }

    .content-el-container {
        // margin-top: 45px;
    }

    @media screen and (max-width: 768px) {
        .content-el-container {
            // margin-top: 31px;
        }
    }
</style>
