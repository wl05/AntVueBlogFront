<template>
  <div class="profile">
    <p class="profile__title">个人简介</p>
    <img class="profile__photo" src="../../../assets/profile.jpeg"/>
    <div class="profile__info">
      <div>汪乐,</div>
      <div>17年毕业于<a class="profile__school" href="https://www.uestc.edu.cn/">电子科技大学</a></div>
      <div></div>
      <div>2929712050@qq.com</div>
      <a class="profile__github" href="https://github.com/antbaobao">github(ANT1994)</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile {
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    color: #828282;
    font-size: 14px;
    &__title {
      font-size: 20px;
      display: none;
    }
    &__photo {
      width: 90px;
      height: 110px;
      float: left;
      border: 1px solid #eee;
      border-radius: 5px;
      margin-right: 10px;
    }
    &__school {
      color: #34495e;
      text-decoration: none;
    }
    &__info {
      font-size: 0.9em;
      line-height: 1.5;
    }
    &__github {
      color: #34495e;
      text-decoration: none;
    }
  }

  .profile:after {
    content: '';
    display: block;
    clear: both;
  }

  @media (max-width: 960px) {
    .profile {
      margin-top: 45px;
      box-shadow: none;
      &__title {
        display: block;
      }
    }

  }
</style>
