<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="LOGOUT">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import defaultAvatar from '@/assets/defaultAvatar.png'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapState('user', {
      avatar: state => (state.avatar ? state.avatar : defaultAvatar)
    }),
    ...mapState('app', {
      sidebar: state => state.sidebar
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/ToggleSideBar')
    },
    ...mapMutations('user', ['LOGOUT'])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
