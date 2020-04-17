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
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  props: {
    replyToCommentId: {
      type: String,
      default: ''
    },
    replyToUserId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: '',
      visibleButton: true,
      comments: []
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
        content: this.content,
        reply_to_comment_id: this.replyToCommentId,
        reply_to_user_id: this.replyToUserId
      })
      this.$emit('success')
    }
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
