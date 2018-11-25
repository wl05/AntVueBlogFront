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
        <div class="comments-container">
          <ant-gitment id="comments" :options="options" v-if="options"></ant-gitment>
        </div>
      </div>
    </div>
</template>
<script>
import { getArticleDetail } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import { randomNum } from '@/utils/randomNumImg'
import Markdown from '@/components/Markdown'
import Spin from '@/components/Spin'
export default {
  components: {
    Markdown,
    Spin,
    Comment
  },
  data () {
    return {
      getArticleDetailLoading: false,
      detail: {},
      options: {
        id: `${this.$route.params.id}`,
        owner: 'antbaobao',
        repo: 'AntBlogComments',
        oauth: {
          client_id: 'ccaff36e451494dd4e12',
          client_secret: '52301845a8d314b57fdfd99fe37f2c8b46550a5e'
        },
        theme: {
          render (state, instance) {
            const container = document.createElement('div')
            container.lang = 'zh-CH'
            container.className = 'gitment-container gitment-root-container'

            // your custom component
            container.appendChild(instance.renderSomething(state, instance))
            container.appendChild(instance.renderHeader(state, instance))
            container.appendChild(instance.renderEditor(state, instance))
            container.appendChild(instance.renderComments(state, instance))
            // container.appendChild(instance.renderFooter(state, instance))
            return container
          },
          renderSomething (state, instance) {
            const container = document.createElement('div')
            container.lang = 'zh-CH'
            if (state.user.login) {
              container.innerText = `你好, ${state.user.login}`
            }
            return container
          }
        }
      }
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
      const num = randomNum(12, 37)
      const img = require(`@/assets/detailImg/${num}.jpg`)
      const background = {
        background: `url(${img}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundAttachment: 'fixed'
      }
      return background
    }
  },
  mounted () {
    this.getArticleDetail(this.$route.params.id)
  },
  created () {

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
// @import 'gitment/style/default.css';
.index {
  // background: url("../../assets/011.jpg") no-repeat;
  height: 100vh;
  background-size: 100%;
  overflow: scroll;
  padding-top: 45px;
  background-size: 100vw 100vh;
  background-attachment: fixed;
  box-sizing: border-box;
  .detail-background {
    .detail-container-wrap {
      width: 100%;
      min-height: 100vh;
      margin-top: 15px;
      .detail-container {
        background: rgba(255, 255, 255, 0.8);
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
  .comments-container {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.6);
    padding: 40px;
    box-sizing: border-box;
    max-height: 600px;
    overflow: scroll;
    margin-bottom: 40px;
    border-radius: 5px;
    #comments {
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
          border-radius: 0px;
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
