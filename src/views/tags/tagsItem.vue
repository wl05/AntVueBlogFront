<template>
  <div class="tag-item">
    <CustomSkeleton v-if="getArticlesByTagLoading"
                    style="padding: 20px;backgroundColor:white;margin-bottom: 1px;padding: 20px"/>
    <div v-else class="tags-item__container">
      <CustomNoData v-if="noData" text="暂无数据"/>
      <timeline v-else timeline-theme="#006666">
        <timeline-title font-color="#24272E">{{$route.query.name}} 标签</timeline-title>
        <timeline-item
          font-color="#4F566B"
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
      padding: 40px;
      margin: 20px 10px 0 20px;
      background-color: white;
    }
    .tags-item__no-data {
      text-align: center;
    }
    .tags-item__timeline-item:hover {
      cursor: pointer;
    }
    .tags-item__date {
      margin-right: 15px;
      font-size: 12px;
      color: #282828;
      font-family: Georgia, serif;
    }
    .tags-item__title {
      font-size: 14px;
    }
    .timeline-title {
      font-size: 30px;
      font-weight: 700;
      color: #4F566B;
      font-family: Georgia, serif;
    }
    .timeline-item {
      margin: 5px 0 0 28px;
      padding-bottom: 5px;
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
        border-radius: 0;
      }
    }
  }
</style>
