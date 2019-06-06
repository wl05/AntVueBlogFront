<template>
  <div class="articles-item-container">
    <a class="articles-item-container__title"
       @click="$router.push({name:'Detail',params:{id:article._id}})">
      {{article.title}}
    </a>
    <div class="articles-item-container__date-tag">
      <span class="articles-item-container__icon fa fa-calendar">
        <span class="articles-item-container__publish-date">{{formatTimestamp(Number(article.publishAt)/1000)}}</span>
      </span>
      <span class="articles-item-container__post-meta-divider">|</span>
      <span class="articles-item-container__icon fa fa-envelope">
        <a class="articles-item-container__category"
           @click="$router.push({path: `/categories/${article.category}`,query:{name:article.category_detail.name}})"
        >
          {{article.category_detail.name}}
        </a>
      </span>
      <span class="articles-item-container__tagIcon articles-item-container__post-meta-divider">|</span>
      <span class="articles-item-container__tagIcon icon fa fa-tags">
        <a
          class="articles-item-container__tag"
          @click="$router.push({ path:`/tags/${article.tag}` })"
        >
            {{article.tag_detail.name}}
        </a>
      </span>
      <span class="articles-item-container__post-meta-divider articles-item-container__view-count-cn-pre">|</span>
      <span class="fa fa-eye articles-item-container__view-count-cn">
        <span class="articles-item-container__view-count">阅读次数 {{article.viewCount}}</span>
      </span>
      <a
        class="articles-item-container__read-more"
        @click="$router.push({name:'Detail',params:{id:article._id}})"
      >
        阅读全文 »
      </a>
    </div>
  </div>
</template>

<script>
import formatTimestamp from '@/utils/formatTimestamp'

export default {
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  methods: {
    formatTimestamp (timestamp) {
      return formatTimestamp(timestamp)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .articles-item-container {
    margin-bottom: 1px;
    padding: 20px;
    background-color: white;
    &__title {
      display: inline-block;
      border-bottom: none;
      line-height: 1.2;
      vertical-align: top;
      font-size: 14px;
      cursor: pointer;
      color: #24272E;
    }
    &__date-tag {
      font-size: 12px;
      color: #4F566B;
      margin-top: 10px;
      position: relative;
    }
    &__post-meta-divider {
      color: rgba(0, 0, 0, 0.6);
      margin: 0 5px;
    }
    &__publish-date,
    &__tag,
    &__category {
      font-size: 12px;
      cursor: pointer;
    }
    &__publish-date,
    &__tag,
    &__category,
    &__view-count {
      margin-left: 1px;
      font-family: Georgia, serif;
    }
    &__content {
      max-width: 700px;
      font-size: 14px;
      overflow: hidden;
      margin-top: 15px;
    }
    &__read-more {
      font-size: 12px;
      display: inline-block;
      cursor: pointer;
      position: absolute;
      right: 10px;
    }
  }

  @media screen and (max-width: 960px) {
    .articles-item-container {
      &__tagIcon {
        display: none;
      }
      &__view-count-cn-pre {
        display: none;
      }
      &__view-count-cn {
        display: none;
      }
    }
  }
</style>
