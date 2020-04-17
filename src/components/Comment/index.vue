<template>
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
            :commentId="item._id"
            @reply="(commentId)=>currentCommentId=commentId"
            :content="item.content"
          />
        <div class="comment__sub-list">
          <div v-if="false">
            <div class="comment__sub-list-item">
              <CommentatorInfo
                commentator="Tom"
                :createAt="item.createAt | formatTimestamp"
                :commentId="item._id"
                @reply="(commentId)=>currentCommentId=commentId"
                content="@Ant 是啊，别人为了口饭那么辛苦，小偷却夺人饭碗，所以偷盗能不能加重判刑！"
              />
            </div>
            <div class="comment__sub-list-item">
              <CommentatorInfo
                commentator="Tony"
                :createAt="item.createAt | formatTimestamp"
                :commentId="item._id"
                @reply="(commentId)=>currentCommentId=commentId"
                content="@Ant 是啊，别人为了口饭那么辛苦，小偷却夺人饭碗，所以偷盗能不能加重判刑！"
              />
            </div>
          </div>
          <Comment @success="getCommentByArticleId" v-if="currentCommentId === item._id"/>
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
      currentCommentId: ''
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
