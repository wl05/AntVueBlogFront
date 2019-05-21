<template>
  <div class="articles-list">
    <CustomSpin v-if="fetchArticleLoading"/>
    <div v-else
         class="articles-list__container"
         ref="articles-list-container"
    >
      <item
        v-for="(item) in articles"
        :key="item._id"
        :article="item"
      />
      <div id="article-list__pagination-id">
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
import { fetchArticle } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import item from './components/item'

export default {
  data () {
    return {
      fetchArticleLoading: false,
      pageSize: 1,
      pageLimit: 15,
      count: 0,
      articles: [],
      loadMoreLoading: false
    }
  },
  components: {
    item
  },
  mounted () {
    const pageSize = this.$route.query.pageSize ? this.$route.query.pageSize : 1
    this.fetchArticle(pageSize, this.pageLimit)
  },
  beforeRouteUpdate (to, from, next) {
    const pageSize = to.query.pageSize
    this.fetchArticle(pageSize, this.pageLimit)
    next()
  },
  methods: {
    formatTimestamp (timestamp) {
      return formatTimestamp(timestamp)
    },
    handleCurrentChange (val) {
      this.$router.push({path: '/', query: {pageSize: val}})
    },
    async fetchArticle (pageSize, pageLimit) {
      this.fetchArticleLoading = true
      try {
        const result = await fetchArticle({pageSize, pageLimit})
        this.fetchArticleLoading = false
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
    &__container {
      border-radius: 5px;
      margin-bottom: 60px;
      padding: 40px;
      max-width: 800px;
      margin: 0px auto;
    }
  }

  @media screen and (max-width: 768px) {
    .articles-list {
      padding-top: 31px;
      &__container {
        padding: 10px;
        border-radius: 0;
      }
      #article-list__pagination-id {
        overflow: scroll;
      }
    }
  }
</style>
