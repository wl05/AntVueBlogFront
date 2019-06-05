<template>
  <div class="articles-list">
    <div
      class="articles-list__container"
      ref="articles-list-container"
    >
      <Skeleton v-if="fetchArticleLoading"/>
      <item
        v-for="(item) in articles"
        :key="item._id"
        :article="item"
        v-else
      />
      <div id="article-list__pagination-id">
        <el-pagination
          v-if="count>pageLimit && !fetchArticleLoading"
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
import Skeleton from '@/components/Skeleton'

export default {
  data () {
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
    item,
    Skeleton
  },
  watch: {
    $route () {
      const pageSize = this.$route.query.pageSize ? Number(this.$route.query.pageSize) : 1
      this.pageSize = pageSize
      this.fetchArticle(pageSize, this.pageLimit)
    }
  },
  mounted () {
    const pageSize = this.$route.query.pageSize ? Number(this.$route.query.pageSize) : 1
    this.pageSize = pageSize
    this.fetchArticle(pageSize, this.pageLimit)
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
      padding: 10px 0 20px 40px;
      /*max-width: 800px;*/
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
