<template>
    <div class="header-container-wrap">
        <header class="header-container">
            <a
                class="blog-title-container"
                @click="$router.push('/')"
            >
                <span class="blog-title">
                    ANT
                    <!--<img class="logo-img" :src="logoImgUrl"/>-->
                </span>
            </a>

            <a class="native-bar">
                <el-dropdown trigger="click">
                    <span class="fa fa-bars"></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <a
                                @click="$router.push({path:'/categories'})"
                                class="menu-item-text"
                            >
                                <span class="fa fa-fw fa-th"></span>
                                分类
                            </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a @click="$router.push({path:'/archives'})" class="menu-item-text">
                                <span class="fa fa-fw fa-archive"></span>
                                归档
                            </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a @click="$router.push({path:'/tags'})" class="menu-item-text">
                                <span class="fa fa-fw fa-tags"></span>
                                标签
                            </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a @click="$router.push({path:'/about'})" class="menu-item-text">
                                <span class="fa fa-fw fa-user"></span>
                                关于我
                            </a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </a>

            <div class="menu-container">
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    :default-active="index"
                    @select="handleSelect"

                >
                    <el-menu-item index="/categories">
                        <a class="menu-item-text">
                            <span class="fa fa-fw fa-th"></span>
                            分类
                        </a>
                    </el-menu-item>
                    <el-menu-item index="/archives">
                        <a class="menu-item-text">
                            <span class="fa fa-fw fa-archive"></span>
                            归档
                        </a>
                    </el-menu-item>
                    <el-menu-item index="/tags">
                        <a class="menu-item-text">
                            <span class="fa fa-fw fa-tags"></span>
                            标签
                        </a>
                    </el-menu-item>
                    <el-menu-item index="/about">
                        <a class="menu-item-text">
                            <span class="fa fa-fw fa-user"></span>
                            关于我
                        </a>
                    </el-menu-item>
                </el-menu>
            </div>
        </header>
    </div>

</template>

<script>
import logoImgUrl from '@/assets/logo.png'

export default {
  name: 'Header',
  data () {
    return {
      tabPosition: 'top',
      logoImgUrl,
      index: {...this.$router.history.current}.path
    }
  },
  mounted () {
    // console.log('this.$router.history', this.$router.history, '\n')
    console.log('this.$router.history.current.path', this.$router.history.current)
  },
  computed: {},
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({path: key})
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
    .header-container-wrap {
        .header-container {
            display: flex;
            max-width: 900px;
            margin: 0 auto;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            .menu-item-text {
                text-decoration: none;
            }
            .blog-title-container {
                color: white;
                cursor: pointer;
                font-size: 20px;
                font-weight: bold;
                .logo-img {
                    width: 131px;
                    height: 57px;
                }
            }
            .blog-title-container:hover {
                color: white;
            }
            .native-bar {
                display: none;

            }
            .native-bar:hover {
                cursor: pointer;
            }
            .el-menu::after {
                content: none;
            }
            .el-menu-item {
                background-color: white;
                color: white
            }
            .el-menu-item:hover {
                color:rgba(255, 255, 255, 0.95);
            }
            .el-menu--horizontal > .el-menu-item.is-active {
                color: rgba(0, 0, 0, 0.95);
                border-bottom: none;
            }
            .el-menu--horizontal > .el-menu-item {
                height: auto;
                line-height: inherit;
                border-bottom: 0;
                background-color: transparent;
            }
            .el-menu.el-menu--horizontal {
                border-bottom: none;
            }
            .header-container-wrap .header-container {
                background-color: transparent;
            }

        }

        @media screen and (max-width: 768px) {
            .header-container {
                /*flex-direction: column;*/
                /*justify-content: space-between;*/
                padding: 0 25px;
                .native-bar {
                    display: block;

                }
                .fa-bars {
                    color: rgba(255, 255, 255, 0.95);
                    font-size: 28px;
                }
                .menu-container {
                    display: none;
                }

            }

        }
    }

</style>
