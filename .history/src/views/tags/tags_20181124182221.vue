<template>
  <div class="index" :style="bagStyle">
    <Spin v-if="listLoading" />
      <div class="tags-container">
        <h1 class="title">
          Tagscloud
        </h1>
        <p class="count">
          目前标签共{{list.length}}个标签
        </p>
        <div class="items">
          <item v-for="(i,index) in list" :key="index" :item="i" />
        </div>
      </div>
    </div>
</template>

<script>
import { getList } from '@/api/tags'
import item from './components/item'
import Spin from '@/components/Spin'
import {randomNumImg, randomNum} from '@/utils/randomNumImg'
export default {
  data () {
    return {
      list: [],
      listLoading: false
    }
  },
  components: {
    item,
    Spin
  },
  created () {
    this.getList()
  },
  computed: {
    bagStyle: function () {
      return randomNumImg(randomNum())
    }
  },
  methods: {
    async getList () {
      this.listLoading = true
      try {
        const result = await getList()
        this.listLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.list = result.data.data
        }
      } catch (e) {
        this.listLoading = false
        this.$message.error('出错了')
      }
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.index {
  height: 100vh;
  overflow: scroll;
  padding-top: 45px;
  box-sizing: border-box;
    .tags-container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, .8);
      // margin-top: 30px;
      border-radius: 5px;
      padding: 40px;
      .count {
        font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
        text-align: center;
      }
      .items {
        display: flex;
        justify-content: center;
        padding: 20px;
      }
      .title {
        font-size: 26px;
        font-weight: 400;
        text-align: center;
        padding: 20px;
      }
  }
}
 @media screen and (max-width: 768px) {
    .index {
      padding-top: 31px;
        .tags-container {
          padding: 40px 10px;
          border-radius: 0px;
          .items {
            flex-wrap: wrap;
          }
      }
    }
  }
</style>
