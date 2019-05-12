<template>
  <div class="profile">
    <p class="profile__title">个人简介</p>
    <img class="profile__photo" src="../../../assets/profile.jpeg"/>
    <div class="profile__info">
      <div>汪乐,</div>
      <div>17年毕业于<a href="https://www.uestc.edu.cn/">电子科技大学，</a></div>
      <div></div>
      <div>2929712050@qq.com</div>
      <a class="profile__github" href="https://github.com/antbaobao">同性交友账号ANT1994</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile {
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    .profile__title {
      font-size: 20px;
      display: none;
    }
    .profile__photo {
      width: 90px;
      height: 110px;
      float: left;
      border: 1px solid #eee;
      border-radius: 5px;
      margin-right: 10px;
    }
    a {
      color: #34495e;
    }
  }

  .profile:after {
    content: '';
    display: block;
    clear: both;
  }

  .profile__info {
    font-size: 0.9em;
    line-height: 1.5;
  }

  .profile__github {
    color: #34495e;
  }

  @media (max-width: 960px) {
    .profile {
      margin-top: 45px;
      box-shadow: none;
      .profile__title {
        display: block;
      }
    }

  }
</style>
