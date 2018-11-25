<template>
  <div class="index">
    <Spin v-if="fetchArticleLoading" />
    <div v-else class="archives-list-container">
      <ul>
        <li v-for="(value, key) in formatedArticles" class="item-container" :key="key">
          <span class="key">{{key}}</span>
          <ul class="article-container">
            <li :key="index" class="article-item" v-for="(item,index) in value" @click="$router.push({name:'Detail',params:{id:item._id}})">
              <span>{{item.date}}</span>
              <span>{{item.title}}</span>

            </li>
          </ul>

        </li>
      </ul>
      <div class="pagination">
        <el-pagination v-if="count>pageLimit" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageSize" :page-size="pageLimit" layout="total, prev, pager, next" :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArticle } from '@/api/article'
import formatYearAndDate from '@/utils/formatYearAndDate'
import Spin from '@/components/Spin'

export default {
  data () {
    return {
      fetchArticleLoading: false,
      pageSize: 1,
      pageLimit: 10,
      count: 0,
      articles: []
    }
  },
  components: {
    // item,
    Spin
  },
  computed: {
    formatedArticles () {
      let articles = [...this.articles]
      return this.formatArticles(articles)
    }
  },
  created () {
    this.fetchArticle(this.pageSize, this.pageLimit)
  },
  methods: {
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
    formatArticles (articles) {
      for (let article of articles) {
        article.year = formatYearAndDate(Number(article.publishAt) / 1000)[0]
        article.date = formatYearAndDate(Number(article.publishAt) / 1000)[1]
      }
      let data = {}
      try {
        for (let i = 0; i < articles.length; i++) {
          if (data[articles[i].year]) {
            data[articles[i].year].push({
              _id: articles[i]._id,
              date: articles[i].date,
              title: articles[i].title
            })
          } else {
            data[articles[i].year] = [{
              _id: articles[i]._id,
              date: articles[i].date,
              title: articles[i].title
            }]
          }
        }
      } catch (e) {
        console.log(e)
      }
      return data
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
  background: url("../../assets/001.jpg") no-repeat;
  height: 100vh;
  background-size: 100%;
  overflow: scroll;
  padding-top:45px;
  .archives-list-container {
    border-radius: 5px;
    margin-top: 30px;
    background: rgba(0, 0, 0, 0.9) none repeat scroll !important;
    min-height: 800px;
    padding: 40px;
    max-width: 800px;
    margin: 30px auto;
    color: rgba(255, 255, 255, 0.6);
    .item-container {
      padding: 20px;
      .key {
        font-size: 20px;
      }
      .article-container {
        margin-top: 40px;
        padding: 15px;
        .article-item {
          padding: 15px 0;
          margin-bottom: 60px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.6);
          cursor: pointer;
        }
        .article-item:hover {
          color: rgba(255, 255, 255, 0.9);
          border-bottom: 1px dashed rgba(255, 255, 255, 0.9);
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .index {
    padding-top:31px;
    .archives-list-container {
      padding: 40px 10px;
      border-radius: 0;
      .pagination {
        overflow: scroll;
      }
    }
  }
}
</style>
