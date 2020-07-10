<template>
  <div class="articles-list">
    <div class="articles-list__container" ref="articles-list-container">
      <div v-if="fetchArticleLoading">
        <CustomSkeleton
          v-for="i of [0,1,2]"
          :key="i"
          style="backgroundColor:white;margin-bottom: 1px;padding: 20px"
        />
      </div>
      <item v-for="(item) in articles" :key="item._id" :article="item" v-else />
      <div id="article-list__pagination-id">
        <el-pagination
          style="background-color:transparent"
          v-if="count>pageLimit && !fetchArticleLoading"
          @current-change="handleCurrentChange"
          :current-page.sync="pageSize"
          :page-size="pageLimit"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { fetchArticle } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import item from './components/item'

export default {
  data() {
    return {
      fetchArticleLoading: false,
      pageLimit: 15,
      count: 0,
      articles: [],
      loadMoreLoading: false,
      pageSize: 1
    }
  },
  components: {
    item
  },
  watch: {
    $route() {
      const pageSize = this.$route.query.pageSize
        ? Number(this.$route.query.pageSize)
        : 1
      this.pageSize = pageSize
      this.fetchArticle(pageSize, this.pageLimit)
    }
  },
  created() {
    const pageSize = this.$route.query.pageSize
      ? Number(this.$route.query.pageSize)
      : 1
    this.pageSize = pageSize
    this.fetchArticle(pageSize, this.pageLimit)
  },
  methods: {
    formatTimestamp(timestamp) {
      return formatTimestamp(timestamp)
    },
    handleCurrentChange(val) {
      this.$router.push({ path: '/', query: { pageSize: val } })
    },
    async fetchArticle(pageSize, pageLimit) {
      this.fetchArticleLoading = true
      try {
        const result = await fetchArticle({ pageSize, pageLimit })
        this.fetchArticleLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          const { article, count, pageSize, pageLimit } = result.data.data
          this.articles = article
          this.count = count
          this.pageSize = pageSize
          this.pageLimit = pageLimit
        }
      } catch (e) {
        this.fetchArticleLoading = false
        this.$message.error('出错了')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.articles-list {
  box-sizing: border-box;
  min-height: 100vh;
  &__container {
    border-radius: 5px;
    margin: 0px auto;
  }
}

@media screen and (max-width: 960px) {
  .articles-list {
    &__container {
      padding: 20px 10px 20px 10px;
    }
  }
}
</style>
