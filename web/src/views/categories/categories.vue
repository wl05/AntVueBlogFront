<template>
  <div class="categories">
    <CustomSkeleton
      v-if="listLoading"
      style="padding: 20px;backgroundColor:white;margin-bottom: 1px;padding: 20px"
    />
    <div v-else class="categories__container-wrap">
      <div class="categories__category-container">
        <h1 class="categories__title">Categories</h1>
        <p class="categories__count">目前共 {{count}} 个分类</p>
        <ul class="categories__items">
          <li
            v-for="(item,index) in list"
            :key="index"
            class="categories__item"
            @click="$router.push({path: `/categories/${item._id}`,query:{name:item.name}})"
          >
            <a>{{item.name}}</a>
            (
            <span>{{item.total}}</span>)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { countCategotres } from '@/api/category'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      count: 0
    }
  },
  mounted() {
    this.countCategotres()
  },
  watch: {
    list(newValue) {
      this.count = newValue.length
    }
  },
  methods: {
    async countCategotres() {
      this.listLoading = true
      try {
        const result = await countCategotres()
        this.listLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.list = result.data.data
        }
      } catch (e) {
        this.listLoading = false
        this.$message.error('出错了')
      }
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.categories {
  box-sizing: border-box;
  background-color: white;
  &__category-container {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 5px;
    padding: 40px;
  }
  &__count {
    text-align: center;
    font-size: 14px;
  }
  &__items {
    display: flex;
    padding: 20px;
    flex-direction: column;
    font-size: 14px;
  }
  &__item {
    padding: 10px;
    cursor: pointer;
  }
  &__title {
    font-size: 24px;
    text-align: center;
    padding: 20px;
  }
}

@media screen and (max-width: 960px) {
  .categories {
    padding-top: 31px;
    margin-left: 10px;
    &__category-container {
      border-radius: 0px;
      padding: 40px 10px;
      width: 100%;
    }
  }
}
</style>
