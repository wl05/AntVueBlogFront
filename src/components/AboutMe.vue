<template>
    <div class="about-me-container">
        我是最帅的
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
//    import { Button } from "element-ui"
export default {
  name: 'AboutMe',
  data () {
    return {
      //                msg : 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    //            ...mapState({
    //                data : state => {
    //                    return state.helloWorld.data
    //                }
    //            }),
    //            ...mapGetters({
    //                count : "count"
    //            })
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
</style>
