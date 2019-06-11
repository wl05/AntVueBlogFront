<template>
  <div class="activation">
    <div class="activation__bg"/>
    <div class="activation__cn">
      <div class="activation__cn-content">
        <span class="activation__info">注册成功！</span>
        <h1 class="activation__title">激活邮件</h1>
        <p class="activation__thank">感谢您的注册！一封激活邮件已经发至您的邮箱，请点击邮件中的链接地址激活您的账号。</p>
        <div class="activation__mail">
          <a href="//mail.qq.com/" class="activation__item mail_qq"></a>
          <a href="//mail.google.com/" class="activation__item mail_gmail"></a>
          <a href="//www.126.com/" class="activation__item mail_126"></a>
          <a href="//mail.163.com/" class="activation__item mail_163"></a>
          <a href="//cn.mail.yahoo.com/" class="activation__item mail_yahoo"></a>
          <a href="//mail.sina.com.cn/" class="activation__item mail_sina"></a>
        </div>
        <div>
          <h2 class="activation__no-mail">没有收到邮件？</h2>
          <input type="hidden" id="regAgainMail" value="1502189493@qq.com">
          <input type="hidden" id="regAgainActive" value="db682bf8b7878cd820f0c3cf14e479e3">
          <ol class="activation__no-list">
            <li>有些邮件接收邮件有一定的时间延迟</li>
            <li>看看是不是在垃圾邮件中</li>
            <li>点击<a class="r3" id="sendMailAgain" href="javascript:">这里</a>重新发送一次激活邮件</li>
            <li>联系管理员，使用注册邮箱发送邮件至2929712050@qq.com手动激活</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  .activation {
    &__bg {
      background: url("../../assets/activation.jpeg") no-repeat;
      background-size: cover;
      height: 100vh;
    }
    &__cn {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      height: 100vh;
      width: 100vw;
      left: 0;
      top: 0
    }
    &__cn-content {
      position: absolute;
      padding: 40px 150px;
      background: white;
      min-height: 300px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 984px;
      box-sizing: border-box;
    }
    &__info {
      position: absolute;
      right: 155px;
      top: 36px;
      padding: 1px 6px;
      background: #C00;
      color: white;
    }
    &__item {
      display: inline-block;
      height: 60px;
      margin-right: 50px;
      background-image: url('../../assets/active_mail_logo.png');
      background-repeat: no-repeat;
    }
    &__thank {
      padding: 10px 0 10px 3px;
      color: #34538b;
    }
    &__title {
      font: bold 14px Verdana;
      padding: 0 0 3px 3px;
      border-bottom: 1px dotted #ddd;
    }
    &__no-mail {
      font-weight: bold;
      padding: 20px 0 3px 3px;
      font-size: 12px;
      border-bottom: 1px dotted #ddd;
    }
    &__no-list {
      padding-left: 20px;
      padding-top: 10px;
    }
    &__no-list li {
      padding: 6px 0 2px;
      list-style-type: decimal;
      color: #666666;
    }
    .mail_qq {
      width: 190px;
      background-position: 0 0;
    }

    .mail_gmail {
      width: 110px;
      background-position: -190px 0;
    }

    .mail_126 {
      width: 142px;
      background-position: -300px 0;
    }

    .mail_163 {
      width: 138px;
      background-position: -442px 0;
    }

    .mail_yahoo {
      width: 188px;
      background-position: -580px 0;
    }

    .mail_sina {
      width: 152px;
      background-position: -768px 0;
    }

  }
</style>
