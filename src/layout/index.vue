<template>
    <div class="container" id="particles-js" ref="particles">
        <el-container>
            <!--<div class="header-container">-->
            <el-header height="85px">
                <Header/>
            </el-header>
            <!--</div>-->
            <el-container style="margin-top:85px">
                <el-main>
                    <div class="content-container">
                        <router-view/>
                    </div>
                </el-main>
                <el-footer>
                    <Footer/>
                </el-footer>
            </el-container>
        </el-container>
    </div>

</template>

<script>
	import Header from './Header.vue'
	import Sider from './Sider.vue'
	import Footer from './Footer.vue'
	// import particlesJS from 'particles.js'
	// const particlesJS = require('particles.js')
	import 'particles.js'
	import particles from '@/assets/particles'

	export default {
		name: 'Layout',
		components: {
			Header,
			Sider,
			Footer
		},
		mounted () {
			console.log(particles)
			particlesJS.load('particles-js', JSON.stringify(particles), function () {
				console.log('callback - particles.js config loaded')
			})
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
    }

    .container {
        background: url("../assets/background.jpg") no-repeat;
        background-size: 100% 100%;
        height: 100vh;
        overflow: scroll
    }

    .content-container {
        min-height: 800px;
        /*max-width: 800px;*/
        margin: 0 auto;
    }

    .el-main {
        padding: 0;
    }

    .el-footer {
        background: rgba(0, 0, 0, 0.9);
    }
</style>
