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
</style>
