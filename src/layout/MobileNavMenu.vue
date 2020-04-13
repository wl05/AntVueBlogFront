<template>
  <a class="header__native-bar">
    <el-dropdown trigger="click">
      <span class="fa fa-bars header__bars" style="color: white"></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <a
            @click="$router.push({path:'/categories'})"
            :class="['header__menu-item-text',index==='/categories' ? 'header__active-class' : '' ]"
          >
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
</template>
<script>
export default {
  name: 'MobileNavMenu',
  data() {
    return {
      index: '',
      activeIndex: '1',
      keywords: ''
    }
  },
  watch: {
    $route() {
      const path = window.location.pathname
      const navRoutes = ['/categories', '/archives', '/tags', '/about']
      if (navRoutes.indexOf(path) === -1) {
        this.index = ''
      }
    }
  },
  mounted() {
    this.index = window.location.pathname
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.header {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #006666;
  border-bottom: 1px solid #006666;
  box-shadow: 0 2px 8px #f0f1f2;
  width: 100%;
  position: fixed;
  z-index: 999;
  &__content {
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    width: 100%;
    max-width: 960px;
  }
  &__search-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
  }
  &__search-button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 999;
    color: #4f566b;
  }
  &__search-button:hover {
    color: #4f566b;
  }
  &__menu-item-text {
    text-decoration: none;
    padding: 0 15px;
    font-size: 14px;
    height: 50px;
    display: inline-block;
    line-height: 50px;
    color: white;
  }
  &__menu-item-text:hover {
    color: #4f566b;
  }
  &__active-class {
    background: rgba(255, 255, 255, 0.4);
    color: #4f566b;
  }
  &__blog-title {
    cursor: pointer;
    font-size: 30px;
    color: white;
    font-weight: bolder;
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
    color: #4f566b;
    background-color: white;
  }
  .el-input__inner:focus {
    border-color: #dcdfe6;
  }
  .el-input__inner:hover {
    border-color: #dcdfe6;
  }
}

@media screen and (max-width: 960px) {
  .header {
    padding: 0 25px;
    position: fixed;
    margin-bottom: 50px;
    z-index: 999;
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
