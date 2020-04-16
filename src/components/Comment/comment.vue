<template>
  <div class="comment">
    <div class="comment__header">
      <el-input
        v-model="content"
        @focus="visibleButton=true"
        @blur="visibleButton=false"
        :disabled="!userInfo ? true : false"
        :placeholder="userInfo ? '输入评论' :'登录评论'"
      />
      <div class="comment__button">
        <el-button
          @click="postComment"
          v-show="visibleButton || !disabledButton"
          :disabled="disabledButton"
        >评论</el-button>
      </div>
    </div>
    <div class="comment__list">
      <div v-for="item of comments" :key="item._id">
        <span>{{item.commentator.name}}</span>
        <span>{{item.createAt | formatTimestamp}}</span>
        <span>{{item.content}}</span>
        <div class="comment__sub-list" v-if="item.sub_comments.length"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { postComment, getCommentByArticleId } from '@/api/comment'
import formatTimestamp from '@/utils/formatTimestamp'
export default {
  data() {
    return {
      content: '',
      visibleButton: true,
      comments: []
    }
  },
  filters: {
    formatTimestamp(timestamp) {
      return formatTimestamp(Number(timestamp) / 1000, false)
    }
  },
  computed: {
    disabledButton() {
      return !this.content
    },
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async postComment() {
      await postComment({
        article_id: this.$route.params.id,
        content: this.content
      })
      this.getCommentByArticleId()
    },
    async getCommentByArticleId() {
      const res = await getCommentByArticleId(this.$route.params.id)
      this.comments = res.data.data
      console.log(this.comments)
    }
  },
  mounted() {
    this.getCommentByArticleId()
  }
}
</script>

<style lang="scss" scoped>
.comment {
  &__header {
    background-color: #eeeeee;
    padding: 10px 15px;
    border-radius: 5px;
  }
  &__button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
    box-sizing: border-box;
  }
}
</style>
