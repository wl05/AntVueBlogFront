<template lang="html">
  <div class="articles-detail">
    <div class="articles-detail__background">
      <div class="articles-detail__container-wrap">
        <div v-if="Object.keys(detail).length" class="articles-detail__container">
          <header class="articles-detail__header">
            <h4 class="articles-detail__title">{{detail.title}}</h4>
            <div class="articles-detail__date-tag">
                      <span class="articles-detail__icon fa fa-calendar">
                          <span
                            class="articles-detail__publish-date">{{formatTimestamp(Number(detail.publishAt)/1000)}}</span>
                      </span>
              <span class="articles-detail__post-meta-divider">|</span>
              <span class="articles-detail__icon fa fa-envelope">
                          <a class="articles-detail__category"
                             @click="$router.push({path: `/categories/${detail.category._id}`,query:{name:detail.category.name}})"
                          >{{detail.category.name}}</a>
                      </span>
              <span class="articles-detail__tag-icon articles-detail__post-meta-divider">|</span>
              <span class="articles-detail__tag-icon icon fa fa-tags">
                          <a
                            class="articles-detail__tag"
                            @click="$router.push({ path:`/tags/${detail.tag._id}` })"
                          >
                              {{detail.tag.name}}
                          </a>
                      </span>
              <span class="articles-detail__post-meta-divider">|</span>
              <span class="fa fa-eye">
                          阅读次数 {{detail.viewCount}}
                      </span>
            </div>
          </header>
          <div class="articles-detail__content">
            <Markdown :htmlValue="content.htmlValue"/>
            <div>
              <PaymentCode/>
            </div>
          </div>
        </div>
        <CustomSpin v-else/>
      </div>
      <div class="articles-detail__comments-container">
        <Comment :title="detail.title"/>
      </div>

    </div>
  </div>
</template>
<script>
import { getArticleDetail } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import Markdown from '@/components/Markdown'
import Comment from '@/components/Comment'
import PaymentCode from '@/components/PaymentCode'

export default {
  components: {
    Markdown,
    Comment,
    PaymentCode
  },
  data () {
    return {
      getArticleDetailLoading: false,
      detail: {}
    }
  },
  computed: {
    content: function () {
      return {
        htmlValue: this.detail.htmlValue,
        markdownValue: this.detail.markdownValue
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.getArticleDetail(this.$route.params.id)
  },
  mounted () {
    this.getArticleDetail(this.$route.params.id)
  },
  methods: {
    formatTimestamp (timestamp) {
      return formatTimestamp(timestamp)
    },
    async getArticleDetail (id) {
      this.getArticleDetailLoading = true
      try {
        const result = await getArticleDetail(id)
        if (result.data.code) {
          this.$message.error('获取失败')
        } else {
          this.detail = result.data.data
        }
        this.getArticleDetailLoading = false
      } catch (e) {
        this.getArticleDetailLoading = false
        this.$message.error('获取失败')
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .articles-detail {
    background-attachment: fixed;
    box-sizing: border-box;
    .articles-detail__container-wrap {
      width: 100%;
      min-height: 100vh;
    }
    .articles-detail__container {
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 800px;
      margin: 30px auto;
    }
    .articles-detail__header {
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .articles-detail__date-tag {
      margin-top: 15px;
      font-size: 12px;
    }
    .articles-detail__post-meta-divider {
      color: rgba(255, 255, 255, 0.6);
      margin: 0 5px;
    }
    .articles-detail__publish-date,
    .articles-detail__tag,
    .articles-detail__category {
      font-size: 12px;
      cursor: pointer;
      margin-left: 5px;
      font-family: Georgia, serif;
    }
    .articles-detail__title {
      margin: 5px 0;
      color: #000000;
      font-weight: 500;
      font-size: 24px;
    }
    .articles-detail__content {
      padding: 0 40px 20px;
    }
    .articles-detail__comments-container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.6);
      padding: 40px;
      box-sizing: border-box;
      margin-bottom: 40px;
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 768px) {
    .articles-detail {
      padding-top: 31px;
      .articles-detail__background {
        background: rgba(0, 0, 0, 0.8);
        margin-top: 30px;
      }
      .articles-detail__container {
        margin: 30px auto;
        border-radius: 0px;
      }
      .articles-detail__header {
        padding: 10px;
      }
      .articles-detail__tag-icon {
        display: none;
      }
      .articles-detail__content {
        padding: 10px;
      }
    }
  }
</style>
