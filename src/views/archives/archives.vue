<template>
  <div class="archives">
    <Spin v-if="fetchArticleLoading"/>
    <div v-else class="archives__list-container">
      <timeline timeline-theme="rgba(0,0,0,0.3)">
        <div
          v-for="(value, key) in formatedArticles"
          class="archives__item-container"
          :key="key"
        >
          <timeline-title
            icon-size="large"
            font-color="#555"
          >
            {{value.year}}
          </timeline-title>
          <timeline-item
            icon-size="small"
            :key="index"
            v-for="(item,index) in value.value"
            font-color="rgb(0,0,0)"
          >
            <div
              class="archives__article-item"
              @click="$router.push({name:'Detail',params:{id:item._id}})"
            >
              <span class="archives__date">{{item.date}}</span>
              <span class="archives__title">{{item.title}}</span>
            </div>
          </timeline-item>
        </div>
      </timeline>
      <div class="archives__pagination">
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
import formatYearAndDate from '@/utils/formatYearAndDate'
import Spin from '@/components/Spin'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  data () {
    return {
      fetchArticleLoading: false,
      pageSize: 1,
      pageLimit: 15,
      count: 0,
      articles: []
    }
  },
  components: {
    Spin,
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  computed: {
    formatedArticles () {
      let articles = [ ...this.articles ]
      return this.formatArticles(articles)
    }
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
    handleCurrentChange (val) {
      this.$router.push({path: '/archives', query: {pageSize: val}})
    },
    formatArticles (articles) {
      for (let article of articles) {
        article.year = formatYearAndDate(Number(article.publishAt) / 1000)[ 0 ]
        article.date = formatYearAndDate(Number(article.publishAt) / 1000)[ 1 ]
      }
      const data = []
      try {
        for (let i = 0; i < articles.length; i++) {
          let existValue = data.find((val) => val.year === articles[ i ].year)
          if (existValue) {
            existValue.value.push({
              _id: articles[ i ]._id,
              date: articles[ i ].date,
              title: articles[ i ].title
            })
          } else {
            data.push({
              year: articles[ i ].year,
              value: [
                {
                  _id: articles[ i ]._id,
                  date: articles[ i ].date,
                  title: articles[ i ].title
                }
              ]
            })
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
  .archives {
    padding-top: 45px;
    box-sizing: border-box;
    &__list-container {
      border-radius: 5px;
      padding: 0 40px 40px;
      max-width: 800px;
      margin: 0px auto;
    }
    &__article-item {
      cursor: pointer;
    }
    .timeline-title {
      font-size: 30px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.6);
    }
    &__date {
      margin-right: 15px;
      font-size: 12px;
      color: #282828;
    }
    &__title {
      font-size: 16px;
      font-weight: 400;
      color: #333;
    }
  }

  @media screen and (max-width: 768px) {
    .archives {
      padding-top: 31px;
      &__list-container {
        padding: 40px 10px;
        border-radius: 0;
      }
      &__pagination {
        overflow: scroll;
      }
    }
  }
</style>
