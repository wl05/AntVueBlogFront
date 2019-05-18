<template lang="html">
  <div class="about">
    <div class="about__wrap">
      <div class="about__container">
        <p class="about__info">
          <span class="about__icon fa fa-qq"></span>
          <span class="about__info-text">2929712050@qq.com</span>
        </p>
        <p class="about__info">
          <span class="about__icon fa fa-github"></span>
          <a class="about__github-url about__info-text"
             href="https://github.com/antbaobao">https://github.com/antbaobao</a>
        </p>
        <p class="about__info">
          抱着学习的心态工作，充实自己，提升自己，目标明确，方向清晰。
        </p>
        <p class="about__info">
          保持对工作的热忱，对新事物的好奇，砥砺前行！
        </p>
        <p class="about__info">目前在工作中使用的技术栈主要包括:
          react、react native、vue、nodejs、koa、egg、mongo等。
        </p>
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
      width: 300px;
      transition: box-shadow 1s;
    }
    &__container:hover {
      box-shadow: 0px 8px 8px #888888;
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
      font-size: 12px;
      padding: 10px;
      font-family: FontAwesome;
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
