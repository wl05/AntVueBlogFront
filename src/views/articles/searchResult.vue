<template>
  <div class="articles-result">
    <div
      class="articles-result__container"
      ref="articles-list-container"
    >
      <div v-if="getArticlesByKeywordsLoading">
        <CustomSkeleton
          v-for="i of [0,1,2]"
          :key="i"
          style="backgroundColor:white;margin-bottom: 1px;padding: 20px"
        />
      </div>
      <CustomNoData
        v-else-if="!articles.length"
        text="没有找到文章。试试其它搜索？"/>
      <div v-else>
        <p class="articles-result__tip-info">
          {{`"${this.$route.query.s}"的搜索结果`}}
        </p>
        <item
          v-for="(item) in articles"
          :key="item._id"
          :article="item"
        />
        <div id="article-pagination-id">
          <el-pagination
            v-if="count>pageLimit"
            @current-change="handleCurrentChange"
            :current-page.sync="pageSize"
            :page-size="pageLimit"
            layout="total, prev, pager, next"
            :total="count"
          >
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { getArticlesByKeywords } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import item from './components/item'

export default {
  data () {
    return {
      getArticlesByKeywordsLoading: false,
      pageLimit: 15,
      count: 0,
      pageSize: 1,
      articles: [],
      loadMoreLoading: false
    }
  },
  components: {
    item
  },
  mounted () {
    const pageSize = this.$route.query.pageSize ? Number(this.$route.query.pageSize) : 1
    this.pageSize = pageSize
    this.getArticlesByKeywords(this.$route.query.s, pageSize, this.pageLimit)
  },
  watch: {
    $route () {
      const pageSize = this.$route.query.pageSize ? Number(this.$route.query.pageSize) : 1
      this.pageSize = pageSize
      this.getArticlesByKeywords(this.$route.query.s, pageSize, this.pageLimit)
    }
  },
  methods: {
    formatTimestamp (timestamp) {
      return formatTimestamp(timestamp)
    },
    handleCurrentChange (val) {
      this.$router.push({path: '/article/keywords', query: {pageSize: val, s: this.$route.query.s}})
    },
    async getArticlesByKeywords (keywords, pageSize, pageLimit) {
      this.getArticlesByKeywordsLoading = true
      try {
        const result = await getArticlesByKeywords(keywords, pageSize, pageLimit)
        this.getArticlesByKeywordsLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          const {article, count, pageSize, pageLimit} = result.data.data
          this.articles = article
          this.count = count
          this.pageSize = pageSize
          this.pageLimit = pageLimit
        }
      } catch (e) {
        this.getArticlesByKeywordsLoading = false
        this.$message.error('出错了')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .articles-result {
    box-sizing: border-box;
    &__container {
      border-radius: 5px;
      padding: 20px 10px 40px;
      max-width: 800px;
      margin: 0px auto;
    }
    &__tip-info {
      font-size: 24px;
      margin-bottom: 15px;
    }
  }
</style>
