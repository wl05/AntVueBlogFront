<template lang="html">
  <div class="index" :style="bagStyle">
    <div class="about-container-wrap">
      <div class="about-container">
        <pre class="poem">
          长相思·山一程

          山一程，水一程，
          身向榆关那畔行，
          夜深千帐灯。

          风一更，雪一更，
          聒碎乡心梦不成，
          故园无此声。
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
import avatarUrl from '@/assets/about.jpeg'
import { randomNumImg, randomNum } from '@/utils/randomNumImg'
// <img
// class="about-item avatar"
// width="200"
// height="200"
// :src="avatarUrl"
//   />
//   <div class="about-item-container">
//   <p class="about-item">
//   <span class="icon fa fa-fw fa-user"></span> 汪乐(ANT)
//   </p>
//
//   <p class="about-item">
//   <span class="icon fa fa-qq"></span> 2929712050@qq.com
//   </p>
//   <p class="about-item">
//   <span class="icon fa fa-github"></span> <a class="github-url" href="https://github.com/antbaobao">
// https://github.com/antbaobao</a>
//   </p>
// <p class="about-item">
//   <span class="icon fa fa-heartbeat"></span> 养龟、动漫、打代码
//   </p>
//   <p class="about-item">
//   <span class="icon fa fa-map-marker"></span> 新加坡
//   </p>
//   </div>
export default {
  components: {},
  data () {
    return {
      avatarUrl
    }
  },
  computed: {
    bagStyle: function () {
      return randomNumImg(randomNum())
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .index {
    height: 100vh;
    overflow: scroll;
    padding-top: 45px;
    box-sizing: border-box;
    .about-container-wrap {
      width: 100%;
      // color: rgba(255, 255, 255, 0.6);
      .about-container {
        margin: 30px auto 0;
        background: rgba(255, 255, 255, .8);
        padding: 40px;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        max-width: 800px;
        justify-content: space-around;
        .about-item-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 30px;
          .about-item {
            padding: 10px;
            .icon {
              margin-right: 10px;
            }
            .github-url {
              color: rgba(0, 0, 0, 1);
              text-decoration: none
            }
          }
        }
        .poem {
          line-height: 28px;
          font-size: 16px;
        }
        .avatar {
          border-radius: 100%;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .index {
      padding-top: 31px;
      .about-container-wrap {
        .about-container {
          flex-direction: column;
          align-items: center;
          padding: 40px 10px;
          border-radius: 0;
          .about-item-container {
            margin-top: 30px;
          }
        }
      }
    }
  }
</style>
