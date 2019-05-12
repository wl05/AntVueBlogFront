<template>
  <div class="archives">
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
import { timeAgo } from '@/utils/filters'

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
    .archives__title {
      font-size: 20px;
    }
    .archives__items-container {
      margin: 0;
      padding: 0;
      .archives__item {
        float: left;
        width: 50%;
        list-style-type: none;
        color: #828282;
        font-size: 0.9em;
        padding: 5px 0;
      }
    }
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

  .archives:after {
    content: '';
    display: block;
    clear: both;
  }

  .archives__item-info {
    cursor: pointer;
  }

</style>
