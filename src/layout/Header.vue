<template>
    <el-row :gutter="24" type="flex" align="middle" justify="space-between">
        <el-col :span="12">
            <div>
                <a class="blog-title-container">
                    <!--<img width="60" height="30" :src="logoImgUrl"/>-->
                    <!--<span class="top-line"></span>-->
                    <span class="blog-title">
                    ANT
                </span>
                    <!--<span class="bottom-line"></span>-->
                </a>
            </div>


        </el-col>
        <el-col :span="12">
            <div class="menu-container">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                         @select="handleSelect">
                    <el-menu-item index="/">
                        <a class="menu-item-text">首页</a>
                    </el-menu-item>
                    <el-menu-item index="categories">
                        <a class="menu-item-text">分类</a>
                    </el-menu-item>
                    <el-menu-item index="archives">
                        <a class="menu-item-text">归档</a>
                    </el-menu-item>
                    <el-menu-item index="tags">
                        <a class="menu-item-text">标签</a>
                    </el-menu-item>
                    <el-menu-item index="about">
                        <a class="menu-item-text">关于我</a>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-col>
    </el-row>
</template>

<script>
	import logoImgUrl from '@/assets/logo.jpg'

	export default {
		name: 'Header',
		data () {
			return {
				tabPosition: 'top',
				activeIndex: '/',
				logoImgUrl
			}
		},
		created () {

		},
		components: {},
		methods: {
			handleSelect (key, keyPath) {

				console.log(this.$route)

				if (key === '/') {
					this.$router.push('/')
				} else if (key === 'categories') {
					this.$router.push({path: '/categories'})
				} else if (key === 'archives') {
					this.$router.push({path: '/archives'})
				} else if (key === 'tags') {
					this.$router.push({path: '/tags'})
				} else if (key === 'about') {
					this.$router.push({path: '/about'})
				} else {
					this.$router.push('/')
				}
			}
		}
	}
</script>
<style lang="scss" scoped rel="stylesheet/scss">

    .el-row {
        max-width: 1000px;
        padding: 0 15px;
        height: 85px;
        margin: 0 auto !important;
        .el-dropdown-menu__item--divided:before,
        .el-menu,
        .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
        .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
        .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
            background: transparent;
        }
        .el-menu--horizontal > .el-menu-item {
            // border: none;
            // height: inherit;
            // line-height: inherit;
            // border-radius: 2px
        }
        .el-menu--horizontal > .el-menu-item {
            .menu-item-text {
                font-size: 13px;
            }
        }

        .el-menu.el-menu--horizontal {
            border: none;
        }

        .el-menu--horizontal > .el-menu-item a:hover {
            color: rgba($color: #fff, $alpha: 0.6);
        }

        .el-menu--horizontal > .el-menu-item.is-active {
            border-color: #fff;
        }

        .menu-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
        .blog-title-container {
            display: flex;
            flex-direction: column;
            /*align-items: center;*/
            width: 100px;
            cursor: pointer;
            .blog-title {
                font-size: 22px;
                font-weight: bolder;
                color: #fff;
                margin-top: 10px;
                margin-bottom: 10px;
                text-align: center;
            }
            .top-line, .bottom-line {
                display: inline-block;
                height: 2px;
                background: rgba(255, 255, 255, 0.8);
                width: 70px;
                margin: 0 auto;
            }
        }

        .menu-item-text {
            font-size: 14px;
            color: #fff;
        }
    }
</style>
