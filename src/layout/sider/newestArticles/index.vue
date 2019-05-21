<template>
  <div class="newest-articles" v-if="newestArticle.length">
    <p class="newest-articles__title">最新文章</p>
    <ul class="newest-articles__items-container">
      <li
        v-for="item in newestArticle"
        :key="item._id"
        class="newest-articles__item"
      >
        »
        <a @click="goToDetailPage(item._id)"> {{ item.title }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'newest-article',
  computed: {
    newestArticle () {
      return this.$store.state.home.newestArticle
    },
  },
  methods: {
    goToDetailPage (id) {
      this.$router.push({path: `/article/detail/${id}`})
    },
  }
}
</script>
<style lang="scss" scoped>
  .newest-articles {
    margin-top: 45px;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;;
    &__title {
      font-size: 20px;
      color: #567;
    }
    &__items-container {
      margin: 0;
      padding: 0;
    }
    &__item {
      padding: 5px;
      list-style-type: none;
      color: #828282;
      font-size: 0.9em;
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
