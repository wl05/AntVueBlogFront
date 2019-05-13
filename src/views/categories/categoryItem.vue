<template>
  <div class="index">
    <Spin v-if="getArticlesByCategoryLoading"/>
    <div v-else class="category-item-list-container">
      <div class="no-data" v-if="noData">
        暂无数据
      </div>
      <timeline timeline-theme="rgba(0,0,0,0.3)" v-else>
        <timeline-title font-color="#555" class="key">{{$route.query.name}} 分类</timeline-title>
        <timeline-item
          v-for="(item, key) in articles"
          :key="key"
        >
          <a
            @click="$router.push({name:'Detail',params:{id:item._id}})"
            class="timeline-item-container"
          >
            <span class="date">{{formatYearAndDate(Number(item.publishAt)/1000)}}</span>
            <span class="title">{{item.title}}</span>
          </a>
        </timeline-item>
      </timeline>
      <el-pagination
        v-if="count>pageLimit"
        @size-change="handleSizeChange"
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
import Spin from '@/components/Spin'
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
  beforeRouteUpdate (to, from, next) {
    next()
    this.getArticlesByCategory()
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
    Spin
  },
  mounted () {
    this.getArticlesByCategory()
  },
  methods: {
    formatYearAndDate (timestamp) {
      const add0 = (m) => {
        return m < 10 ? '0' + m : m
      }
      const format = (timestamps) => {
        var time = new Date(parseInt(timestamps) * 1000)
        var y = time.getFullYear()
        var m = time.getMonth() + 1
        var d = time.getDate()
        return `${y}-${add0(m)}-${add0(d)}`
      }
      return format(timestamp)
    },
    async getArticlesByCategory () {
      this.getArticlesByCategoryLoading = true
      try {
        const result = await getArticlesByCategory(this.$route.params.id, this.pageSize, this.pageLimit)
        this.getArticlesByCategoryLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.articles = result.data.data.article
          this.noData = !(this.articles.length > 0)
          this.count = result.data.data.count
        }
      } catch (e) {
        console.log(e)
        this.getArticlesByCategoryLoading = false
        this.$message.error('出错了')
      }
    },
    handleSizeChange (val) {
      this.pageLimit = val
      this.getArticlesByCategory()
    },
    handleCurrentChange (val) {
      this.pageSize = val
      this.getArticlesByCategory()
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .index {
    box-sizing: border-box;
    padding-top: 30px;
    .category-item-list-container {
      border-radius: 5px;
      margin-bottom: 60px;
      padding: 40px;
      max-width: 800px;
      margin: 0px auto;
      .no-data {
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
      .timeline-item-container {

        .date {
          margin-right: 15px;
          font-size: 12px;
          color: #282828;
        }
        .title {
          font-size: 16px;
          font-weight: 400;
          color: #333;
        }
      }

    }
  }

  @media screen and (max-width: 768px) {
    .index {
      padding-top: 31px;
      .category-item-list-container {
        padding: 40px 10px;
        border-radius: 0px;
      }
    }
  }
</style>
