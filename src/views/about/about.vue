<template lang="html">
  <div class="index" :style="bagStyle">
    <div class="about-container-wrap">
      <div class="about-container">
        <img class="avatar" width="100" height="100" :src="avatarUrl"/>
        <p class="poem">
          <span class="icon fa fa-qq"></span>
          <span class="info">2929712050@qq.com</span>
        </p>
        <p class="poem">
          <span class="icon fa fa-github"></span>
          <a class="github-url info" href="https://github.com/antbaobao">https://github.com/antbaobao</a>
        </p>
        <p class="poem">
          抱着学习的心态工作，充实自己，提升自己，目标明确，方向清晰。
        </p>
        <p class="poem">
          保持对工作的热忱，对新事物的好奇，砥砺前行！
        </p>
        <p class="poem">目前在工作中使用的技术栈主要包括:
          react、react native、vue、nodejs、koa、egg、mongo等。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import avatarUrl from '@/assets/about.jpeg'
import { randomNumImg, randomNum } from '@/utils/randomNumImg'
import debounce from '@/utils/debounce'

export default {
  data () {
    return {
      avatarUrl
    }
  },
  computed: {
    bagStyle: function () {
      // return ''
      return randomNumImg(randomNum())
    }
  },
  methods: {
    scroll (e) {
      let scrollTop = e.target.scrollTop
      if (!this.scrollTop) this.scrollTop = scrollTop

      if (scrollTop - this.scrollTop > 60) {
        this.animationClass = 'slideUp'
        this.scrollTop = scrollTop
      }
      if (scrollTop - this.scrollTop < -60) {
        this.animationClass = 'slideDown'
        this.scrollTop = scrollTop
      }
    }
  },
  destroyed () {
    document.removeEventListener('scroll', this.scroll)
  },
  created () {
    document.addEventListener('scroll', debounce((e) => this.scroll(e), 100), true)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .index {
    height: 100vh;
    overflow: scroll;
    padding-top: 45px;
    box-sizing: border-box;
    background-color: #EEEEEE;
    .about-container-wrap {
      width: 100%;
      .about-container {
        margin: 30px auto;
        padding: 40px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        width: 300px;
        /*box-shadow: 0px 5px 5px #ddd;*/
        transition: box-shadow 1s;
        .about-item-container {
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
          font-size: 12px;
          padding: 10px;
          font-family: FontAwesome;
          width: 100%;
          .info {
            font-size: 14px;
            color: #1b1f23;
            text-decoration: none;
          }
        }
        .avatar {
          border-radius: 100%;
          transition: transform 4s;
        }
        .avatar:hover {
          transform: rotate(360deg);
        }
      }
      .about-container:hover {
        box-shadow: 0px 8px 8px #888888;
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
          width: 100%;
          .about-item-container {
            margin-top: 30px;
          }
        }
      }
    }
  }
</style>
