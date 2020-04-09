<template>
  <div class="archives sider-item-common" v-if="archives.length">
    <p class="archives__title">文章归档</p>
    <p />
    <ul class="archives__items-container">
      <li v-for="item in archives" :key="item._id" class="archives__item">
        »
        <a class="archives__item-info" @click="goTo(item._id)">{{ item._id}} ({{item.count}})</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'archives',
  computed: {
    archives() {
      return this.$store.state.home.archives
    }
  },
  methods: {
    goTo(_id) {
      this.$router.push({ path: `/archive/${_id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
.archives {
  &__title {
    font-size: 18px;
    color: #4f566b;
    margin-bottom: 10px;
  }
  &__items-container {
    margin: 0;
    padding: 0;
  }
  &__item {
    float: left;
    width: 50%;
    list-style-type: none;
    color: #4f566b;
    font-size: 12px;
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
}

@media screen and (max-width: 960px) {
  .archives {
    box-shadow: none;
  }
}
</style>
