<template>
  <div class="class-container">
    <div v-if="!visible" class="btn-container">
      <el-button type="warning" size="large" circle @click="show">赏</el-button>
      <span style="font-weight: bold">↑</span>
      <span>打发点吧</span>
    </div>
    <div v-if="visible">
      <img class="url" width="150" height="150" :src="alipayUrl"/>
      <img class="url" width="150" height="150" :src="weixinUrl"/>
    </div>
  </div>
</template>
<script>
import alipayUrl from '@/assets/payment/alipay.png'
import weixinUrl from '@/assets/payment/weixin.png'

export default {
  data () {
    return {
      alipayUrl,
      weixinUrl,
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    }
  }
}
</script>

<style scoped>
  .class-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
  }

  .title {
    font-size: 24px;
    /*font-weight: bold;*/
    font-family: Sana
  }

  .url {
    padding: 10px;
    border: 1px solid #ffffff;
    background: #ffffff;
    border-radius: 5px;
    margin: 10px;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }

  .el-button--warning {
    background-color: #f5a10c;
    border-color: #f5a10c;
  }

  .el-button.is-circle {
    padding: 13px;
    font-size: 30px;
  }
</style>
