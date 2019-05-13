<template>
  <div class="index">
    <Spin v-if="getArticlesByTagLoading"/>
    <div v-else class="tags-item-list-container">
      <div class="no-data" v-if="noData">
        暂无数据
      </div>
      <timeline v-else timeline-theme="rgba(0,0,0,0.3)">
        <timeline-item
          font-color="#555"
          v-for="(item, key) in articles"
          :key="key"
        >
          <a @click="$router.push({name:'Detail',params:{id:item._id}})" class="timeline-item-container">
            <span class="date">{{formatYearAndDate(Number(item.publishAt)/1000)}}</span>
            <span class="title">{{item.title}}</span>
          </a>
        </timeline-item>
      </timeline>
    </div>
  </div>
</template>

<script>
import { getArticlesByTag } from '@/api/article'
import Spin from '@/components/Spin'
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
    TimelineTitle,
    Spin
  },
  created () {
    this.getArticlesByTag()
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
    async getArticlesByTag () {
      this.getArticlesByTagLoading = true
      try {
        console.log(this.$route.params.id)
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
  .index {
    height: 100vh;
    overflow: scroll;
    padding-top: 45px;
    box-sizing: border-box;
    .tags-item-list-container {
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.9);
      margin-bottom: 60px;
      padding: 40px;
      max-width: 800px;
      margin: 30px auto;
      .no-data {
        text-align: center;
        font-size: 16px;
      }
      .timeline-item:hover {
        cursor: pointer;

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
      .tags-item-list-container {
        padding: 40px 10px;
        border-radius: 0px;
      }

    }
  }
</style>
