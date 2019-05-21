<template>
  <div class="category-item">
    <CustomSpin v-if="getArticlesByCategoryLoading"/>
    <div v-else class="category-item__list-container">
      <div class="category-item__no-data" v-if="noData">
        暂无数据
      </div>
      <timeline timeline-theme="rgba(0,0,0,0.3)" v-else>
        <timeline-title font-color="#555" class="category-item__key">{{$route.query.name}} 分类</timeline-title>
        <timeline-item
          v-for="(item, key) in articles"
          :key="key"
        >
          <a
            @click="$router.push({name:'Detail',params:{id:item._id}})"
            class="category-item__timeline-item-container"
          >
            <span class="category-item__date">{{formatYearAndDate(Number(item.publishAt)/1000)}}</span>
            <span class="category-item__title">{{item.title}}</span>
          </a>
        </timeline-item>
      </timeline>
      <el-pagination
        v-if="count>pageLimit"
        @current-change="handleCurrentChange"
        :current-page.sync="pageSize"
        :page-size="pageLimit"
        layout="total, prev, pager, next"
        :total="count"
      />
    </div>
  </div>
</template>

<script>
import { getArticlesByCategory } from '@/api/article'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  data () {
    return {
      getArticlesByCategoryLoading: false,
      articles: [],
      noData: false,
      count: 0,
      pageLimit: 10,
      pageSize: 1
    }
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  beforeRouteUpdate (to, from, next) {
    const pageSize = to.query.pageSize ? to.query.pageSize : 1
    this.getArticlesByCategory(to.params.id, pageSize, this.pageLimit)
    next()
  },
  mounted () {
    const pageSize = this.$route.query.pageSize ? this.$route.query.pageSize : 1
    this.getArticlesByCategory(this.$route.params.id, pageSize, this.pageLimit)
  },
  methods: {
    formatYearAndDate (timestamp) {
      const add0 = (m) => {
        return m < 10 ? '0' + m : m
      }
      const format = (timestamps) => {
        let time = new Date(parseInt(timestamps) * 1000)
        const y = time.getFullYear()
        const m = time.getMonth() + 1
        const d = time.getDate()
        return `${y}-${add0(m)}-${add0(d)}`
      }
      return format(timestamp)
    },
    async getArticlesByCategory (id, pageSize, pageLimit) {
      this.getArticlesByCategoryLoading = true
      try {
        const result = await getArticlesByCategory(id, pageSize, pageLimit)
        this.getArticlesByCategoryLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.articles = result.data.data.article
          this.noData = !(this.articles.length > 0)
          this.count = result.data.data.count
          this.pageSize = result.data.data.pageSize
          this.pageLimit = result.data.data.pageLimit
        }
      } catch (e) {
        console.log(e)
        this.getArticlesByCategoryLoading = false
        this.$message.error('出错了')
      }
    },
    handleCurrentChange (val) {
      this.$router.push({path: `/categories/${this.$route.params.id}`, query: {pageSize: val}})
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .category-item {
    box-sizing: border-box;
    padding-top: 30px;
    &__list-container {
      border-radius: 5px;
      margin-bottom: 60px;
      padding: 40px;
      max-width: 800px;
      margin: 0px auto;
    }
    &__no-data {
      text-align: center;
      font-size: 16px;
    }
    .timeline-item:hover {
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
    .category-item {
      padding-top: 31px;
      &__list-container {
        padding: 40px 10px;
        border-radius: 0px;
      }
    }
  }
</style>
