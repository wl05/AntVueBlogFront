<template>
  <div class="archive-time-range">
    <div class="archive-time-range__list-container">
      <CustomSkeleton
        v-if="getArticlesByArchivesLoading"
        style="backgroundColor:white;margin-bottom: 1px;padding: 20px"
      />
      <div v-else>
        <timeline timeline-theme="#006666">
          <div
            v-for="(value, key) in formatedArticles"
            class="archive-time-range__item-container"
            :key="key"
          >
            <timeline-title icon-size="large" font-color="#567">{{value.year}}</timeline-title>
            <timeline-item
              icon-size="small"
              :key="index"
              v-for="(item,index) in value.value"
              font-color="rgb(0,0,0)"
            >
              <div
                class="archive-time-range__article-item"
                @click="$router.push({name:'Detail',params:{id:item._id}})"
              >
                <span class="archive-time-range__date">{{item.date}}</span>
                <span class="archive-time-range__title">{{item.title}}</span>
              </div>
            </timeline-item>
          </div>
        </timeline>
        <div class="archive-time-range__pagination">
          <el-pagination
            v-if="count>pageLimit"
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
import { getArticlesByArchives } from '@/api/article'
import formatYearAndDate from '@/utils/formatYearAndDate'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  data() {
    return {
      getArticlesByArchivesLoading: false,
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
      const timeline = this.$route.params.timeline
      this.pageSize = pageSize
      this.getArticlesByArchives(pageSize, this.pageLimit, timeline)
    }
  },
  mounted() {
    const pageSize = this.$route.query.pageSize
      ? Number(this.$route.query.pageSize)
      : 1
    const timeline = this.$route.params.timeline
    this.pageSize = pageSize
    this.getArticlesByArchives(pageSize, this.pageLimit, timeline)
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push({
        path: `/archive/${this.$route.params.timeline}`,
        query: { pageSize: val }
      })
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
    async getArticlesByArchives(pageSize, pageLimit, timeline) {
      this.getArticlesByArchivesLoading = true
      try {
        const result = await getArticlesByArchives({
          pageSize,
          pageLimit,
          timeline
        })
        this.getArticlesByArchivesLoading = false
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
        this.getArticlesByArchivesLoading = false
        this.$message.error('出错了')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.archive-time-range {
  padding-top: 10px;
  box-sizing: border-box;
  background-color: white;
  margin: 20px 10px 0 20px;
  &__list-container {
    border-radius: 5px;
    padding: 0 40px;
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
  .archive-time-range {
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
