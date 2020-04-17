<template>
  <div class="comment">
    <div class="comment__commentator-info">
        <div>
        <span class="comment__commentator">{{commentator}}评论于</span>
        <span class="comment__time">{{createAt}}</span>
        </div>
        <div>
            <!-- <i class="fa fa-thumbs-up comment__thumbs" @click="$emit('unlike')" style="color:#006666" aria-hidden="true"></i> -->
            <!-- <i class="fa fa-thumbs-o-up comment__thumbs" @click="$emit('like')" style="color:#006666" aria-hidden="true"></i> -->
            <el-button type="text" @click="onReply">回复</el-button>
        </div>
    </div>
    <div>{{content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    commentator: {
      type: String,
      required: true
    },
    createAt: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  methods: {
    onReply() {
      this.$emit('reply')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  &__commentator {
    font-size: 16px;
  }
  &__commentator-info {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  &__time {
    font-size: 12px;
  }
  &__thumbs{
    cursor: pointer;
  }
}
</style>
