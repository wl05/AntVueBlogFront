<template>
  <div class="layout">
    <Header />
    <section class="layout__content-container">
      <div class="layout__content">
        <router-view />
      </div>
      <Sider class="layout__sider" />
    </section>
  </div>
</template>
<script>
import Header from './Header.vue'
import Sider from './sider/index.vue'
import Footer from './Footer.vue'
import banner from '@/assets/login.jpeg'

export default {
  name: 'Layout',
  data() {
    return {
      headroom: null,
      show: false,
      timer: null,
      banner
    }
  },
  components: {
    Header,
    Sider,
    Footer
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
.layout {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #eeeeee;
  width: 100%;
  &__content-container {
    display: flex;
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 20px;
  }
  &__content {
    width: 70%;
    box-sizing: border-box;
  }
  &__sider {
    width: 30%;
  }
}
</style>
