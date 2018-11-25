<template lang="html">
    <div class="index" :style="detailBagStyle">
      <div class="detail-background">
          <!-- <Comment/> -->
          <div class="detail-container-wrap">
              <div v-if="Object.keys(detail).length" class="detail-container">
                  <header class="header">
                      <h4 class="title">{{detail.title}}</h4>
                      <div class="date-tag">
                      <span class="icon fa fa-calendar">
                          <span class="publish-date">{{formatTimestamp(Number(detail.publishAt)/1000)}}</span>
                      </span>
                          <span class="post-meta-divider">|</span>
                          <span class="icon fa fa-envelope">
                          <a class="category"
                            @click="$router.push({path: `/categories/${detail.category._id}`,query:{name:detail.category.name}})"
                          >{{detail.category.name}}</a>
                      </span>
                          <span class="tagIcon post-meta-divider">|</span>
                          <span class="tagIcon icon fa fa-tags">
                          <a
                              class="tag"
                              @click="$router.push({ path:`/tags/${detail.tag._id}` })"
                          >
                              {{detail.tag.name}}
                          </a>
                      </span>
                          <span class="post-meta-divider">|</span>
                          <span class="fa fa-eye">
                          阅读次数 {{detail.viewCount}}
                      </span>
                      </div>
                  </header>
                  <div class="content">
                      <Markdown :content="content"/>
                  </div>
              </div>
              <Spin v-else/>
          </div>
      </div>
    </div>
</template>
<script>
import { getArticleDetail } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import randomNum from '@/utils/randomNum'
import Markdown from '@/components/Markdown'
import Spin from '@/components/Spin'
import Comment from '@/components/Comment'

export default {
  components: {
    Markdown,
    Spin,
    Comment
  },
  data () {
    return {
      id: '',
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
    },
    detailBagStyle: function () {
      const num = this.randomNum()
      const img = import `@/assets/detailImg/${num}.jpg`
      const background = {
        background: img
      }
      return {}
    }
  },
  mounted () {
    this.getArticleDetail(this.$route.params.id)
  },
  methods: {
    randomNum () {
      return randomNum(19, 37)
    },
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
.index {
  background: url("../../assets/011.jpg") no-repeat;
  height: 100vh;
  background-size: 100%;
  overflow: scroll;
  padding-top: 45px;
  background-size: 100vw 100vh;
  background-attachment: fixed;
  .detail-background {
    .detail-container-wrap {
      width: 100%;
      min-height: 100vh;
      margin-top: 15px;
      .detail-container {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 800px;
        margin: 30px auto;
        .header {
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .date-tag {
            .post-meta-divider {
              color: rgba(255, 255, 255, 0.6);
              margin: 0 5px;
            }
            margin-top: 15px;
            font-size: 12px;
            .publish-date,
            .tag,
            .category {
              font-size: 12px;
              cursor: pointer;
            }
            .publish-date,
            .tag,
            .category {
              margin-left: 5px;
            }
          }
          .title {
            margin: 5px 0;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
        .content {
          padding: 0 40px 20px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .index {
    padding-top: 31px;
    .detail-background {
      background: rgba(0, 0, 0, 0.8);
      margin-top: 30px;
      .detail-container-wrap {
        .detail-container {
          margin: 30px auto;
          .header {
            padding: 10px;
            .tagIcon {
              display: none;
            }
          }
          .content {
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>
