<template>
  <div class="header">
    <a class="header__blog-title-container" @click="goToHome">
      汪乐的个人网站
      <!--Ant Blog-->
    </a>
    <a class="header__native-bar">
      <el-dropdown trigger="click">
        <span class="fa fa-bars"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a @click="$router.push({path:'/categories'})"
               :class="['menu-item-text',index==='/categories' ? 'header__active-class' : '' ]">
              <span class="fa fa-fw fa-th"></span>
              分类
            </a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="$router.push({path:'/archives'})" class="header__menu-item-text">
              <span class="fa fa-fw fa-archive"></span>
              归档
            </a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="$router.push({path:'/tags'})" class="header__menu-item-text">
              <span class="fa fa-fw fa-tags"></span>
              标签
            </a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="$router.push({path:'/about'})" class="header__menu-item-text">
              <span class="fa fa-fw fa-user"></span>
              关于我
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </a>

    <div class="header__menu-container">
      <el-input
        placeholder="请输入搜索内容"
        v-model="keywords"
        size="small"
        class="header__search"
        @keyup.enter.native="goToSearchResultPage"
      >
      </el-input>
      <PcNavMenu/>
    </div>
  </div>
</template>
<script>
import PcNavMenu from './PcNavMenu'

export default {
  name: 'Header',
  components: {
    PcNavMenu
  },
  data () {
    return {
      index: '',
      activeIndex: '1',
      keywords: ''
    }
  },
  methods: {
    handleSelect (key) {
      this.index = key
      this.$router.push({path: key})
    },
    goToHome () {
      window.location = '/'
    },
    goToSearchResultPage () {
      if (!this.keywords) {
        return this.$router.push({path: '/'})
      }
      this.$router.push({path: '/article/keywords', query: {s: this.keywords}})
    }
  },
  watch: {
    $route () {
      const path = window.location.pathname
      const navRoutes = [ '/categories', '/archives', '/tags', '/about' ]
      if (navRoutes.indexOf(path) === -1) {
        this.index = ''
      }
    }
  },
  mounted () {
    this.index = window.location.pathname
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .header {
    display: flex;
    padding: 0 20px;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #d3d3d3;
    &__menu-container {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
    &__search {
      margin-right: 20px;
    }
    &__menu-item-text {
      text-decoration: none;
      padding: 0 15px;
      font-size: 14px;
      height: 50px;
      display: inline-block;
      line-height: 50px;
      color: #828282;
    }
    &__menu-item-text:hover {
      color: #828282;
    }
    &__active-class {
      background: rgba(255, 255, 255, 0.4);
      color: #828282;
    }
    &__blog-title-container {
      cursor: pointer;
      font-size: 30px;
      display: flex;
      align-items: center;
      color: #828282;
    }
    &__native-bar {
      display: none;
    }
    &__native-bar:hover {
      cursor: pointer;
    }
    .el-input__inner {
      border-radius: 1px;
      font-family: Georgia, serif;
      color: #828282;
      background-color: rgba(255, 255, 255, 0.6);
    }
    .el-input__inner:focus {
      border-color: #dcdfe6;
    }
    .el-input__inner:hover {
      border-color: #dcdfe6;
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      padding: 0 25px;
      &__native-bar {
        display: block;
      }
      .fa-bars {
        color: #000;
        font-size: 28px;
      }
      &__menu-container {
        display: none;
      }
    }
  }

</style>
