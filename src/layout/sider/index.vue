<template>
  <div class="sider">
    <Profile />
    <Categories />
    <NewestArticles />
    <Archives />
  </div>
</template>
<script>
import Profile from './profile'
import Archives from './archives'
import Categories from './categories'
import NewestArticles from './newestArticles'

export default {
  components: {
    Profile,
    Archives,
    Categories,
    NewestArticles
  },
  mounted() {
    this.$store.dispatch('FETCH_CATEGORIES')
    this.$store.dispatch('FETCH_NEWEST_ARTICLE')
    this.$store.dispatch('FETCH_ARCHIVES')
  }
}
</script>
<style lang="scss">
@import './style.scss';
.sider {
  color: #000;
  padding: 0px 0px 10px 20px;
  box-sizing: border-box;
}
@media screen and (max-width: 960px) {
  .sider {
    display: none;
  }
}
</style>
