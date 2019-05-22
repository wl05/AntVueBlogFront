<template>
  <div class="archives" v-if="archives.length">
    <p class="archives__title">文章归档</p>
    <p/>
    <ul class="archives__items-container">
      <li
        v-for="item in archives"
        :key="item._id"
        class="archives__item"
      >
        »
        <a
          class="archives__item-info"
          @click="$router.push({ path: `/archive/${item._id}` })"
        >
          {{ item._id}} ({{item.count}})
        </a>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'archives',
  computed: {
    archives () {
      return this.$store.state.home.archives
    },
  }
}
</script>
<style lang="scss" scoped>
  .archives {
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
      float: left;
      width: 50%;
      list-style-type: none;
      color: #828282;
      font-size: 0.9em;
      padding: 5px 0;
    }

    &__item-info {
      cursor: pointer;
    }
  }

  .archives:after {
    content: '';
    display: block;
    clear: both;
  }

  @media screen and (max-width: 1600px) {
    .archives {
      margin-top: 45px;
    }
  }

  @media screen and (max-width: 960px) {
    .archives {
      box-shadow: none
    }
  }


</style>
