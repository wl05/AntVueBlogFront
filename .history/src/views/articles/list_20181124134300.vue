<template>
  <div class="index">
    <Spin v-if="fetchArticleLoading" />
    <div v-else class="articles-list-container" ref="articles-list-container">
      <item v-for="(item,index) in articles" :key="item._id" :article="item" :index="index+1" />
      <div id="articlePaginationId">
        <el-pagination v-if="count>pageLimit" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageSize" :page-size="pageLimit" layout="total, prev, pager, next" :total="count">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import { fetchArticle } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import item from './components/item'
import Spin from '@/components/Spin'

export default {
  data () {
    return {
      fetchArticleLoading: false,
      pageSize: 1,
      pageLimit: 10,
      count: 0,
      articles: [],
      loadMoreLoading: false
    }
  },
  components: {
    item,
    Spin
  },
  created () {
    this.fetchArticle(this.pageSize, this.pageLimit)
  },
  methods: {
    formatTimestamp (timestamp) {
      return formatTimestamp(timestamp)
    },
    handleSizeChange (val) {
      this.pageLimit = val
      this.fetchArticle(this.pageSize, val)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageSize = val
      this.fetchArticle(val, this.pageLimit)
      console.log(`当前页: ${val}`)
    },
    async fetchArticle (pageSize, pageLimit) {
      this.fetchArticleLoading = true
      try {
        const result = await fetchArticle({ pageSize, pageLimit })
        this.fetchArticleLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.articles = result.data.data.article
          this.count = result.data.data.count
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
.index {
  background: url("../../assets/background.jpg") no-repeat;
  height: 100vh;
  background-size: 100%;
  overflow: scroll;
  padding-top: 45px;
  .articles-list-container {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.9);
    margin-bottom: 60px;
    padding: 40px;
    max-width: 800px;
    margin: 30px auto;
  }
}

@media screen and (max-width: 768px) {
  .index {
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
