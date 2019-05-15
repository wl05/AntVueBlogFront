<template>
  <div class="articles-item-container">
    <a class="title"
       @click="$router.push({name:'Detail',params:{id:article._id}})">
      {{article.title}}
    </a>
    <div class="date-tag">
      <span class="icon fa fa-calendar">
        <span class="publish-date">{{formatTimestamp(Number(article.publishAt)/1000)}}</span>
      </span>
      <span class="post-meta-divider">|</span>
      <span class="icon fa fa-envelope">
        <a class="category"
           @click="$router.push({path: `/categories/${article.category}`,query:{name:article.category_detail.name}})"
        >
          {{article.category_detail.name}}
        </a>
      </span>
      <span class="tagIcon post-meta-divider">|</span>
      <span class="tagIcon icon fa fa-tags">
        <a
          class="tag"
          @click="$router.push({ path:`/tags/${article.tag}` })"
        >
            {{article.tag_detail.name}}
        </a>
      </span>
      <span class="post-meta-divider">|</span>
      <span class="fa fa-eye">
        <span class="viewCount">阅读次数 {{article.viewCount}}</span>
      </span>
      <a class="read-more" @click="$router.push({name:'Detail',params:{id:article._id}})">阅读全文 »</a>
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
    padding: 15px 0;
    border-bottom: 1px solid #d3d3d3;
    .title {
      display: inline-block;
      color: #555;
      border-bottom: none;
      line-height: 1.2;
      vertical-align: top;
      font-size: 18px;
      cursor: pointer;
      color: #556677;
    }
    .date-tag {
      .post-meta-divider {
        color: rgba(0, 0, 0, 0.6);
        margin: 0 5px;
      }
      font-size: 12px;
      color: #828282;
      .publish-date, .tag, .category {
        font-size: 12px;
        cursor: pointer;
      }
      .publish-date, .tag, .category, .viewCount {
        margin-left: 5px;
      }
    }
    .content {
      max-width: 700px;
      font-size: 14px;
      overflow: hidden;
      margin-top: 15px;
    }
    .read-more {
      font-size: 12px;
      display: inline-block;
      cursor: pointer;
      margin-left: 15px;
      margin-top: 5px;
    }
  }

  @media screen and (max-width: 768px) {
    .tagIcon {
      display: none;
    }

  }
</style>
