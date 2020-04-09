<template>
  <div class="archives">
    <div class="archives__list-container">
      <CustomSkeleton
        v-if="fetchArticleLoading"
        style="backgroundColor:white;margin-bottom: 1px;padding: 20px"
      />
      <div v-else>
        <timeline timeline-theme="#006666">
          <div v-for="(value, key) in formatedArticles" class="archives__item-container" :key="key">
            <timeline-title icon-size="large" font-color="#24272E">{{value.year}}</timeline-title>
            <timeline-item
              icon-size="small"
              :key="index"
              v-for="(item,index) in value.value"
              font-color="#4F566B"
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
  </div>
</template>
<script>
import { fetchArticle } from '@/api/article'
import formatYearAndDate from '@/utils/formatYearAndDate'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  data() {
    return {
      fetchArticleLoading: false,
      pageLimit: 20,
      pageSize: 1,
      count: 0,
      articles: []
    }
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  computed: {
    formatedArticles() {
      let articles = [...this.articles]
      return this.formatArticles(articles)
    }
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
  mounted() {
    const pageSize = this.$route.query.pageSize
      ? Number(this.$route.query.pageSize)
      : 1
    this.pageSize = pageSize
    this.fetchArticle(this.pageSize, this.pageLimit)
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push({ path: '/archives', query: { pageSize: val } })
    },
    formatArticles(articles) {
      for (let article of articles) {
        article.year = formatYearAndDate(Number(article.publishAt) / 1000)[0]
        article.date = formatYearAndDate(Number(article.publishAt) / 1000)[1]
      }
      const data = []
      try {
        for (let i = 0; i < articles.length; i++) {
          let existValue = data.find(val => val.year === articles[i].year)
          if (existValue) {
            existValue.value.push({
              _id: articles[i]._id,
              date: articles[i].date,
              title: articles[i].title
            })
          } else {
            data.push({
              year: articles[i].year,
              value: [
                {
                  _id: articles[i]._id,
                  date: articles[i].date,
                  title: articles[i].title
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
          this.pageLimit = pageLimit
          this.pageSize = pageSize
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
  padding-top: 10px;
  box-sizing: border-box;
  background-color: white;
  margin: 20px 10px 20px 20px;
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
    font-family: Georgia, serif;
  }
  .timeline-item {
    margin: 5px 0 0 28px;
    padding-bottom: 5px;
  }
  &__date {
    margin-right: 15px;
    font-size: 12px;
    color: #282828;
    font-family: Georgia, serif;
  }
  &__title {
    font-size: 14px;
    font-weight: 400;
    color: #4f566b;
    font-family: Georgia, serif;
  }
}

@media screen and (max-width: 768px) {
  .archives {
    /*padding-top: 31px;*/
    margin-left: 10px;
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
