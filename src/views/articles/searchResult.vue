<template>
  <div class="index">
    <Spin v-if="getArticlesByKeywordsLoading"/>
    <div v-else class="articles-list-container" ref="articles-list-container">
      <item
        v-for="(item) in articles"
        :key="item._id"
        :article="item"
      />
      <div id="articlePaginationId">
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
</template>
<script>
import { getArticlesByKeywords } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import item from './components/item'
import Spin from '@/components/Spin'

export default {
  data () {
    return {
      getArticlesByKeywordsLoading: false,
      pageSize: 1,
      pageLimit: 15,
      count: 0,
      articles: [],
      loadMoreLoading: false
    }
  },
  components: {
    item,
    Spin
  },
  mounted () {
    const pageSize = this.$route.query.pageSize ? this.$route.query.pageSize : 1
    this.getArticlesByKeywords(this.$route.query.s, pageSize, this.pageLimit)
  },
  beforeRouteUpdate (to, from, next) {
    const pageSize = to.query.pageSize ? to.query.pageSize : 1
    this.getArticlesByKeywords(to.query.s, pageSize, this.pageLimit)
    next()
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
  .index {
    box-sizing: border-box;
    .articles-list-container {
      border-radius: 5px;
      margin-bottom: 60px;
      padding: 40px;
      max-width: 800px;
      margin: 0px auto;
    }
  }

  @media screen and (max-width: 768px) {
    .index {
      padding-top: 31px;
      .articles-list-container {
        padding: 10px;
        border-radius: 0;
      }
      #articlePaginationId {
        overflow: scroll;
      }
    }
  }
</style>
