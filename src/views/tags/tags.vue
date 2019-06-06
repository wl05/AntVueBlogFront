<template>
  <div class="tags-wrap">
    <CustomSkeleton v-if="listLoading" style="padding: 20px;backgroundColor:white;margin-bottom: 1px;padding: 20px"/>
    <div v-else class="tags-wrap__container">
      <h1 class="tags-wrap__title">
        Tagscloud
      </h1>
      <p class="tags-wrap__count">
        目前标签共 {{count}} 个标签
      </p>
      <div class="tags-wrap__items">
        <shuffle :list="list"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/tags'
import shuffle from './components/shuffle'

export default {
  data () {
    return {
      list: [],
      listLoading: false,
      count: 0
    }
  },
  components: {
    shuffle
  },
  mounted () {
    this.getList()
  },
  watch: {
    list (newValue) {
      this.count = newValue.length
    }
  },
  methods: {
    async getList () {
      this.listLoading = true
      try {
        const result = await getList()
        this.listLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.$nextTick(function () {
            this.list = result.data.data
          })
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
  .tags-wrap {
    padding-top: 45px;
    box-sizing: border-box;
    color: #4F566B;
    &__container {
      max-width: 800px;
      margin: 30px auto;
      border-radius: 5px;
      padding: 40px;
    }
    &__count {
      /*font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;*/
      text-align: center;
    }
    &__items {
      display: flex;
      justify-content: center;
      padding: 20px;
      flex-wrap: wrap;
    }
    &__title {
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      padding: 20px;
      color: #556677;
    }
  }

  @media screen and (max-width: 768px) {
    .tags-wrap {
      padding-top: 31px;
      &__container {
        padding: 40px 10px;
        border-radius: 0px;
      }
      &__items {
        flex-wrap: wrap;
      }
    }
  }
</style>
