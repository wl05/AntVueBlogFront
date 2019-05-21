<template>
  <ul class="pc-nav-menu">
    <li class="pc-nav-menu__item" @click="handleSelect('/categories')">
      <a :class="['pc-nav-menu__text',index==='/categories' ? 'pc-nav-menu__active-class' : '' ]">
        <span class="fa fa-fw fa-th"></span>
        分类
      </a>
    </li>
    <li class="pc-nav-menu__item" @click="handleSelect('/archives')">
      <a :class="['pc-nav-menu__text',index==='/archives' ? 'pc-nav-menu__active-class' : '' ]">
        <span class="fa fa-fw fa-archive"></span>
        归档
      </a>
    </li>
    <li class="pc-nav-menu__item" @click="handleSelect('/tags')">
      <a :class="['pc-nav-menu__text',index==='/tags' ? 'pc-nav-menu__active-class' : '' ]">
        <span class="fa fa-fw fa-tags"></span>
        标签
      </a>
    </li>
    <li class="pc-nav-menu__item" @click="handleSelect('/about')">
      <a :class="['pc-nav-menu__text',index==='/about' ? 'pc-nav-menu__active-class' : '' ]">
        <span class="fa fa-fw fa-user"></span>
        关于我
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      index: ''
    }
  },
  methods: {
    handleSelect (key) {
      this.index = key
      this.$router.push({path: key})
    },
    updated () {
      const path = window.location.pathname
      const navRoutes = [ '/categories', '/archives', '/tags', '/about' ]
      if (navRoutes.indexOf(path) === -1) {
        this.index = ''
      }
    },
  },
  mounted () {
    this.index = window.location.pathname
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .pc-nav-menu {
    display: flex;
    align-items: center;
    &__item {
      list-style-type: none;
      white-space: nowrap;
    }
    &__item:hover {
      cursor: pointer;
    }
    &__text {
      text-decoration: none;
      padding: 0 15px;
      font-size: 16px;
      height: 50px;
      display: inline-block;
      line-height: 50px;
      color: #828282;
    }
    &__active-class {
      background: rgba(255, 255, 255, 0.4);
      color: #828282;
    }
  }
</style>
