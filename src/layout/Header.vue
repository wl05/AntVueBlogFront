<template>
  <div class="header-container-wrap">
    <div class="header-container">
      <a class="blog-title-container" @click="goToHome">
        汪乐的个人网站
      </a>
      <a class="native-bar">
        <el-dropdown trigger="click">
          <span class="fa fa-bars"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a @click="$router.push({path:'/categories'})"
                 :class="['menu-item-text',index==='/categories' ? 'activeClass' : '' ]">
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
            <a :class="['menu-item-text',index==='/categories' ? 'activeClass' : '' ]">
              <span class="fa fa-fw fa-th"></span>
              分类
            </a>
          </el-menu-item>
          <el-menu-item index="/archives">
            <a :class="['menu-item-text',index==='/archives' ? 'activeClass' : '' ]">
              <span class="fa fa-fw fa-archive"></span>
              归档
            </a>
          </el-menu-item>
          <el-menu-item index="/tags">
            <a :class="['menu-item-text',index==='/tags' ? 'activeClass' : '' ]">
              <span class="fa fa-fw fa-tags"></span>
              标签
            </a>
          </el-menu-item>
          <el-menu-item index="/about">
            <a :class="['menu-item-text',index==='/about' ? 'activeClass' : '' ]">
              <span class="fa fa-fw fa-user"></span>
              关于我
            </a>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      tabPosition: 'top',
      index: '',
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key) {
      this.index = key
      this.$router.push({path: key})
    },
    goToHome () {
      window.location = '/'
    }
  },
  mounted () {
    this.index = window.location.pathname
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .header-container-wrap {
    .header-container {
      display: flex;
      padding: 0 20px;
      margin: 0 auto;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      .menu-item-text {
        text-decoration: none;
        padding: 0 15px;
        font-size: 16px;
        height: 50px;
        display: inline-block;
        line-height: 50px;
      }
      .menu-item-text:hover {
        color: #000;
      }
      .activeClass {
        background: rgba(255, 255, 255, 0.4);
        color: #000;
      }
      .blog-title-container {
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        color: #556677;
        font-weight: normal;
        .logo-img {
          width: 36px;
          height: 51px;
          margin-left: 15px
        }
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
        color: #000;
        padding: 0;
        height: 40px;
      }
      .el-menu-item:hover {
        color: #000;
      }
      .el-menu--horizontal > .el-menu-item.is-active {
        color: #000;
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
        padding: 0 25px;
        .native-bar {
          display: block;
        }
        .fa-bars {
          color: #000;
          font-size: 28px;
        }
        .menu-container {
          display: none;
        }
      }
    }
  }
</style>
