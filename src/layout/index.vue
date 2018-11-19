<template>
    <div class="container" ref="particles">
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-container style="margin-top:60px">
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
		components: {
			Header,
			Sider,
			Footer
		},
		created () {
		}
	}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
    .el-header {
        padding: 0;
        background: rgba(0, 0, 0, 0.9);
        width: 100%;
        position: fixed;
        z-index: 10000;
        color: rgba(0, 0, 0, 1);
        height: auto;

    }

    .container {
        /*background: url("../assets/background.jpg") no-repeat;*/
        background-size: 100% 100%;
        height: 100vh;
        overflow: scroll
    }

    .content-container {
        margin: 0 auto;
    }

    .el-main {
        padding: 0;
    }

    .el-footer {
        background: rgba(0, 0, 0, 0.9);
    }
</style>
