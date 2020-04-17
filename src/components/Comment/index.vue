<template>
<!--  -->
  <div class="comment">
    <Comment
      @success="getCommentByArticleId"
    />
    <div class="comment__list">
      <div class="comment__list-title">评论列表：</div>
      <div class="comment__list-item" v-for="item of comments" :key="item._id">
          <CommentatorInfo
            :commentator="item.commentator.name"
            :createAt="item.createAt | formatTimestamp"
            @reply="()=>{replyToCommentId=item._id;replyToUserId = item.commentator._id}"
            :content="item.content"
          />
        <div class="comment__sub-list">
          <div v-if="item.sub_comments && item.sub_comments.length">
            <div class="comment__sub-list-item" v-for="subItem of item.sub_comments" :key="subItem._id">
              <CommentatorInfo
                :commentator="subItem.commentator.name"
                :createAt="subItem.createAt | formatTimestamp"
                @reply="()=>{replyToCommentId=item._id;replyToUserId = subItem.commentator._id}"
                :content="`@${subItem.reply_to_user.name} ${subItem.content}`"
              />
            </div>
          </div>
          <Comment
              :replyToCommentId="replyToCommentId"
              :replyToUserId="replyToUserId"
              @success="getCommentByArticleId"
              v-if="replyToCommentId === item._id"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postComment, getCommentByArticleId } from '@/api/comment'
import formatTimestamp from '@/utils/formatTimestamp'
import Comment from './comment.vue'
import CommentatorInfo from './commentatorInfo.vue'

export default {
  components: {
    Comment,
    CommentatorInfo
  },
  data() {
    return {
      content: '',
      visibleButton: true,
      comments: [],
      replyToCommentId: '',
      replyToUserId: ''
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
  &__list{
    margin-top: 20px;
  }
  &__button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
    box-sizing: border-box;
  }
  &__list-title {
    font-size: 20px;
    border-bottom: 1px solid #eeeeee;
    padding: 5px 0;
  }
  &__list-item{
   margin-bottom: 20px;
  }
  &__sub-list {
    padding: 10px 0 10px 40px;
  }
  &__sub-list-item {
    border-bottom: 1px solid #eeeeee;
    padding: 5px 0;
  }
  &__sub-list-item:last-child {
    border-bottom: none;
  }
}
</style>
