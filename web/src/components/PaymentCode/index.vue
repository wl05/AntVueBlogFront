<template>
  <div class="payment-code">
    <div v-if="!visible" class="payment-code__btn-container">
      <el-button type="warning" size="large" circle @click="show">赏</el-button>
      <span class="payment-code__up-icon">↑</span>
      <span>打发点吧</span>
    </div>
    <div class="payment-code__image-container" v-if="visible">
      <img class="payment-code__url" width="150" height="150" :src="alipayUrl" />
      <img class="payment-code__url" width="150" height="150" :src="weixinUrl" />
    </div>
  </div>
</template>
<script>
import alipayUrl from '@/assets/payment/alipay.png'
import weixinUrl from '@/assets/payment/weixin.png'

export default {
  data() {
    return {
      alipayUrl,
      weixinUrl,
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  .payment-code__url {
    padding: 10px;
    border: 1px solid #ffffff;
    background: #ffffff;
    border-radius: 5px;
    margin: 10px;
  }
  .payment-code__btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .payment-code {
    .payment-code__image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
    }
  }
}
</style>
