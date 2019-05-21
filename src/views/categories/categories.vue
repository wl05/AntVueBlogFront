<template>
  <div class="categories">
    <CustomSpin v-if="listLoading"/>
    <div v-else class="categories__container-wrap">
      <div class="categories__category-container">
        <h1 class="categories__title">
          Categories
        </h1>
        <p class="categories__count">
          目前共 {{count}} 个分类
        </p>
        <ul class="categories__items">
          <li
            v-for="(item,index) in list"
            :key="index"
            class="categories__item"
            @click="$router.push({path: `/categories/${item._id}`,query:{name:item.name}})"
          >
            <a>{{item.name}}</a>
            (<span>{{item.total}}</span>)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { countCategotres } from '@/api/category'

export default {
  data () {
    return {
      list: [],
      listLoading: false,
      count: 0
    }
  },
  created () {
    this.countCategotres()
  },
  watch: {
    list (newValue) {
      this.count = newValue.length
    }
  },
  methods: {
    async countCategotres () {
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
    padding-top: 45px;
    box-sizing: border-box;
    &__category-container {
      max-width: 800px;
      margin: 0 auto;
      border-radius: 5px;
      padding: 40px;
    }
    &__count {
      font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
      text-align: center;
    }
    &__items {
      display: flex;
      padding: 20px;
      flex-direction: column;
    }
    &__item {
      padding: 10px;
      cursor: pointer;
    }
    &__title {
      font-size: 26px;
      font-weight: 400;
      text-align: center;
      padding: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    .categories {
      padding-top: 31px;
      &__category-container {
        border-radius: 0px;
        padding: 40px 10px;
      }
    }
  }
</style>
