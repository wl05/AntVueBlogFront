<template>
  <div class="tag-item">
    <CustomSpin v-if="getArticlesByTagLoading"/>
    <div v-else class="tags-item__container">
      <CustomNoData v-if="noData" text="暂无数据"/>
      <timeline v-else timeline-theme="rgba(0,0,0,0.3)">
        <timeline-item
          font-color="#555"
          v-for="(item, key) in articles"
          :key="key"
        >
          <a @click="$router.push({name:'Detail',params:{id:item._id}})" class="tags-item__timeline-item-container">
            <span class="tags-item__date">{{formatYearAndDate(Number(item.publishAt)/1000)}}</span>
            <span class="tags-item__title">{{item.title}}</span>
          </a>
        </timeline-item>
      </timeline>
    </div>
  </div>
</template>

<script>
import { getArticlesByTag } from '@/api/article'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  data () {
    return {
      getArticlesByTagLoading: false,
      articles: [],
      noData: false
    }
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  mounted () {
    this.getArticlesByTag()
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
    async getArticlesByTag () {
      this.getArticlesByTagLoading = true
      try {
        const result = await getArticlesByTag(this.$route.params.id)
        this.getArticlesByTagLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.articles = result.data.data
          this.noData = !(this.articles.length > 0)
        }
      } catch (e) {
        this.getArticlesByTagLoading = false
        this.$message.error('出错了')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tag-item {
    box-sizing: border-box;
    .tags-item__container {
      border-radius: 5px;
      margin-bottom: 60px;
      padding: 0 40px;
      max-width: 800px;
      margin: 30px auto;
    }
    .tags-item__no-data {
      text-align: center;
      font-size: 16px;
    }
    .tags-item__timeline-item:hover {
      cursor: pointer;
    }
    .tags-item__date {
      margin-right: 15px;
      font-size: 12px;
      color: #282828;
    }
    .tags-item__title {
      font-size: 16px;
      font-weight: 400;
      color: #333;
    }
    .tags-item__timeline-item-container:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 768px) {
    .tag-item {
      padding-top: 31px;
      .tags-item__container {
        padding: 40px 10px;
        border-radius: 0px;
      }
    }
  }
</style>
