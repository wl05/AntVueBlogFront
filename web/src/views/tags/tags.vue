<template>
  <div class="tags-wrap">
    <CustomSkeleton
      v-if="listLoading"
      style="padding: 20px;backgroundColor:white;margin-bottom: 1px;padding: 20px"
    />
    <div v-else class="tags-wrap__container">
      <h1 class="tags-wrap__title">Tagscloud</h1>
      <p class="tags-wrap__count">目前标签共 {{count}} 个标签</p>
      <div class="tags-wrap__items">
        <shuffle :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/tags'
import shuffle from './components/shuffle'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      count: 0
    }
  },
  components: {
    shuffle
  },
  mounted() {
    this.getList()
  },
  watch: {
    list(newValue) {
      this.count = newValue.length
    }
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const result = await getList()
        this.listLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.$nextTick(function() {
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
  box-sizing: border-box;
  background-color: white;
  &__container {
    max-width: 800px;
    border-radius: 5px;
    padding: 40px;
  }
  &__count {
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
    text-align: center;
    padding: 20px;
  }
}

@media screen and (max-width: 960px) {
  .tags-wrap {
    margin-left: 10px;
    padding-top: 0px;
    &__container {
      padding: 20px 10px;
      border-radius: 0px;
    }
    &__items {
      flex-wrap: wrap;
    }
  }
}
</style>
