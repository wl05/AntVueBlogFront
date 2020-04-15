<template lang="html">
  <div class="articles-detail">
    <div class="articles-detail__background">
      <div class="articles-detail__container-wrap">
        <div class="articles-detail__container">
          <div v-if="!Object.keys(detail).length || getArticleDetailLoading" class="articles-detail__loading">
            <CustomSkeleton style="backgroundColor:white;margin-bottom: 1px;padding: 20px"/>
          </div>
          <div v-else>
            <header class="articles-detail__header">
              <h4 class="articles-detail__title">{{detail.title}}</h4>
              <div class="articles-detail__date-tag">
                      <span class="articles-detail__icon fa fa-calendar">
                      </span>
                <span
                  class="articles-detail__publish-date">{{formatTimestamp(Number(detail.publishAt)/1000)}}</span>
                <span class="articles-detail__post-meta-divider">|</span>
                <span class="articles-detail__icon fa fa-envelope">
                      </span>
                <a class="articles-detail__category"
                   @click="$router.push({path: `/categories/${detail.category._id}`,query:{name:detail.category.name}})"
                >{{detail.category.name}}</a>
                <span class="articles-detail__tag-icon articles-detail__post-meta-divider">|</span>
                <span class="articles-detail__tag-icon icon fa fa-tags"></span>
                <a
                  class="articles-detail__tag"
                  @click="$router.push({ path:`/tags/${detail.tag._id}` })"
                >
                  {{detail.tag.name}}
                </a>
                <span class="articles-detail__post-meta-divider">|</span>
                <span class="fa fa-eye"></span>
                {{detail.viewCount}}
              </div>
            </header>
            <div class="articles-detail__content">
              <Markdown :htmlValue="content.htmlValue"/>
              <div>
                <PaymentCode/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="articles-detail__comments-container">
        <Comment :title="detail.title"/>
      </div> -->
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
  data() {
    return {
      getArticleDetailLoading: false,
      detail: {}
    }
  },
  computed: {
    content: function() {
      return {
        htmlValue: this.detail.htmlValue,
        markdownValue: this.detail.markdownValue
      }
    }
  },
  watch: {
    $route() {
      this.getArticleDetail(this.$route.params.id)
    }
  },
  created() {
    this.getArticleDetail(this.$route.params.id)
  },
  methods: {
    formatTimestamp(timestamp) {
      return formatTimestamp(timestamp)
    },
    async getArticleDetail(id) {
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
  box-sizing: border-box;
  background-color: white;
  &__container-wrap {
    min-height: 100vh;
  }
  &__container {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto;
  }
  &__loading {
    padding: 40px;
  }
  &__header {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__date-tag {
    margin-top: 15px;
    font-size: 14px;
  }
  &__post-meta-divider {
    margin: 0 5px;
  }
  &__publish-date,
  &__tag,
  &__category {
    font-size: 14px;
    cursor: pointer;
    margin-left: 5px;
  }
  &__title {
    margin: 5px 0;
    font-size: 24px;
  }
  &__content {
    padding: 0 40px 20px;
  }
  &__comments-container {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.6);
    padding: 40px;
    box-sizing: border-box;
    margin-bottom: 40px;
    border-radius: 5px;
  }
}

@media screen and (max-width: 960px) {
  .articles-detail {
    margin: 0;
    &__header {
      padding: 40px 10px;
    }
    &__content {
      padding: 0 10px 20px;
    }
  }
}
</style>
