<template>
  <nav class="header">
    <div class="header__content">
      <a class="header__blog-title" @click="goToHome">ANT BLOG</a>
      <PcNavMenu />
      <div class="header__operation">
        <div class="header__search-container">
          <el-input
            placeholder="请输入搜索内容"
            v-model="keywords"
            size="small"
            class="header__search"
            @keyup.enter.native="goToSearchResultPage"
          ></el-input>
          <el-button
            @click="goToSearchResultPage"
            class="header__search-button"
            type="text"
            icon="el-icon-search"
          />
        </div>
        <UserInfo />
      </div>
    </div>
    <MobileNavMenu />
  </nav>
</template>
<script>
import PcNavMenu from './PcNavMenu'
import MobileNavMenu from './MobileNavMenu'
import UserInfo from './userInfo/index'
export default {
  name: 'Header',
  components: {
    PcNavMenu,
    MobileNavMenu,
    UserInfo
  },
  data() {
    return {
      index: '',
      activeIndex: '1',
      keywords: ''
    }
  },
  methods: {
    handleSelect(key) {
      this.index = key
      this.$router.push({ path: key })
    },
    goToHome() {
      window.location = '/'
    },
    goToSearchResultPage() {
      if (!this.keywords) {
        return this.$router.push({ path: '/' })
      }
      this.$router.push({
        path: '/article/keywords',
        query: { s: this.keywords }
      })
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
  &__operation {
    display: flex;
    align-items: center;
  }
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
    margin-right: 20px;
  }
  &__search-button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 999;
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
