<template>
  <div class="newest-articles sider-item-common" v-if="newestArticle.length">
    <p class="newest-articles__title">最新文章</p>
    <ul class="newest-articles__items-container">
      <li v-for="item in newestArticle" :key="item._id" class="newest-articles__item">
        »
        <a @click="goToDetailPage(item._id)">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'newest-article',
  computed: {
    newestArticle() {
      return this.$store.state.home.newestArticle
    }
  },
  methods: {
    goToDetailPage(id) {
      this.$router.push({ path: `/article/detail/${id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
.newest-articles {
  &__title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  &__items-container {
    margin: 0;
    padding: 0;
  }
  &__item {
    padding: 5px;
    list-style-type: none;
    font-size: 14px;
  }
  &__item:hover {
    cursor: pointer;
  }
}

@media (max-width: 960px) {
  .newest-articles {
    box-shadow: none;
  }
}
</style>
