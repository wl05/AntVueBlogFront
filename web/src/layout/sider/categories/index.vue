<template>
  <div class="categories sider-item-common" v-if="categories.length">
    <p class="categories__title">文章分类</p>
    <ul class="categories__items-container">
      <li v-for="item in categories" :key="item._id" class="categories__item">
        »
        <a
          class="categories__info"
          @click="goTo(item._id,item.name)"
        >{{ item.name }} ({{item.total}})</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'categories',
  computed: {
    categories() {
      return this.$store.state.category.categories
    }
  },
  methods: {
    goTo(_id, name) {
      this.$router.push({ path: `/categories/${_id}`, query: { name } })
    }
  }
}
</script>
<style lang="scss" scoped>
.categories {
  &__title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  &__items-container {
    margin: 0;
    padding: 0;
  }
  &__item {
    list-style-type: none;
    font-size: 14px;
    padding: 5px 0;
  }
  &__info {
    cursor: pointer;
  }
}

.categories:after {
  content: '';
  display: block;
  clear: both;
}

@media (max-width: 960px) {
  .categories {
    box-shadow: none;
  }
}
</style>
