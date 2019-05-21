<template>
  <div class="archive-time-range">
    <CustomSpin v-if="getArticlesByArchivesLoading"/>
    <div v-else class="archive-time-range__list-container">
      <timeline
        timeline-theme="rgba(0,0,0,0.3)"
      >
        <div v-for="(value, key) in formatedArticles" class="archive-time-range__item-container" :key="key">
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
            <div class="archive-time-range__article-item" @click="$router.push({name:'Detail',params:{id:item._id}})">
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
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticlesByArchives } from '@/api/article'
import formatYearAndDate from '@/utils/formatYearAndDate'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  data () {
    return {
      getArticlesByArchivesLoading: false,
      pageLimit: 15,
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
    formatedArticles () {
      let articles = [ ...this.articles ]
      return this.formatArticles(articles)
    },
    pageSize: {
      get: function () {
        return this.$route.query.pageSize ? Number(this.$route.query.pageSize) : 1
      },
      set: function (pageSize) {
        return pageSize
      }
    },
    timeline () {
      return this.$route.params.timeline
    }
  },
  watch: {
    pageSize () {
      this.getArticlesByArchives(this.pageSize, this.pageLimit, this.timeline)
    },
    timeline () {
      this.getArticlesByArchives(this.pageSize, this.pageLimit, this.timeline)
    }
  },
  mounted () {
    this.getArticlesByArchives(this.pageSize, this.pageLimit, this.timeline)
  },
  methods: {
    handleCurrentChange (val) {
      this.$router.push({path: `/archive/${this.timeline}`, query: {pageSize: val}})
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
    async getArticlesByArchives (pageSize, pageLimit, timeline) {
      this.getArticlesByArchivesLoading = true
      try {
        const result = await getArticlesByArchives({pageSize, pageLimit, timeline})
        this.getArticlesByArchivesLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          const {article, count, pageSize, pageLimit} = result.data.data
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
    padding-top: 45px;
    box-sizing: border-box;
    &__list-container {
      border-radius: 5px;
      padding: 40px;
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
    &__date {
      margin-right: 15px;
      font-size: 12px;
      color: #282828;
      font-family: Georgia, serif;
    }
    &__title {
      font-size: 16px;
      font-weight: 400;
      color: #333;
      font-family: Georgia, serif;
    }
  }

  @media screen and (max-width: 768px) {
    .archive-time-range {
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
