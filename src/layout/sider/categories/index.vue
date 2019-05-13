<template>
  <div class="categories">
    <p class="categories__title">文章分类</p>
    <ul class="categories__items-container">
      <li
        v-for="item in categories"
        :key="item._id"
        class="categories__item"
      >
        »
        <a
          class="categories__info"
          @click="$router.push({ path: `/categories/${item._id}`,query:{name: item.name} })"
        >
          {{ item.name }} ({{item.total}})
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'categories',
  computed: {
    categories () {
      return this.$store.state.category.categories
    },
  },
}
</script>
<style lang="scss" scoped>
  .categories {
    margin-top: 45px;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;;
    .categories__title {
      font-size: 20px;
    }
    .categories__items-container {
      margin: 0;
      padding: 0;
      .categories__item {
        float: left;
        width: 50%;
        list-style-type: none;
        color: #828282;
        font-size: 0.9em;
        padding: 5px 0;
        .categories__info {
          cursor: pointer;
        }
      }
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
