<template lang="html">
  <div class="about">
    <div class="about__wrap">
      <div class="about__container">
        <p class="about__info">目前在工作中使用的技术栈主要包括: </p>
        <p class="about__info">react、react native、vue、nodejs、koa、egg、mongo</p>
        <p class="about__info">golang 初学者</p>
        <p class="about__info">找坑中...</p>
      </div>
    </div>
  </div>
</template>
<script>
import avatarUrl from '@/assets/about.jpeg'

export default {
  data () {
    return {
      avatarUrl
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .about {
    box-sizing: border-box;
    color: #828282;
    &__wrap {
      width: 100%;
    }
    &__container {
      margin: 30px auto;
      padding: 40px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 360px;
    }
    &__icon {
      margin-right: 10px;
    }
    &__github-url {
      color: rgba(0, 0, 0, 1);
      text-decoration: none
    }
    &__info {
      line-height: 28px;
      font-size: 14px;
      padding: 10px;
      width: 100%;
    }
    &__info-text {
      font-size: 14px;
      color: #1b1f23;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 768px) {
    .about {
      padding-top: 31px;
      &__container {
        flex-direction: column;
        align-items: center;
        padding: 40px 10px;
        border-radius: 0;
        width: 100%;
      }
    }
  }
</style>
