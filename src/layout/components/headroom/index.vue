<template>
  <div :class="['container',animationClass]" id="headroom">
    <slot/>
  </div>
</template>
<script>
import debounce from '@/utils/debounce'

export default {
  data () {
    return {
      animationClass: '',
      scrollTop: 0
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
    console.log('dada')
    document.addEventListener('scroll', debounce((e) => this.scroll(e), 100), true)
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .container {
    position: fixed;
    width: 100%;
    top: 0;
  }

  .slideUp {
    position: fixed;
    width: 100%;
    top: -60px;
    transition: 0.5s top;
  }

  .slideDown {
    position: fixed;
    width: 100%;
    top: 0;
    transition: 0.5s top;
  }

</style>
