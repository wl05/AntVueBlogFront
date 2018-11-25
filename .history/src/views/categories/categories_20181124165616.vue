<template>
  <div class="index" style="bagStyle">
    <Spin v-if="listLoading" />

    <div v-else class="category-container-wrap">
      <div class="category-container">
        <h1 class="title">
          Categories
        </h1>
        <p class="count">
          目前共{{list.length}}个分类
        </p>
        <ul class="items">
          <li v-for="(item,index) in list" :key="index" class="item" @click="$router.push({path: `/categories/${item._id}`,query:{name:item.name}})">
            <a>{{item.name}}</a>
            (<span>{{item.total}}</span>)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { countCategotres } from '@/api/category'
import Spin from '@/components/Spin'
import randomNum from '@/utils/randomNum'

export default {
  data () {
    return {
      list: [],
      listLoading: false
    }
  },
  components: {
    Spin
  },
  created () {
    this.countCategotres()
  },

  methods: {
    bagStyle: function () {
      const num = randomNum(12, 37)
      const img = require(`@/assets/${num}.jpg`)
      const background = {
        background: `url(${img}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundAttachment: 'fixed'
      }
      return background
    },
    async countCategotres () {
      this.listLoading = true
      try {
        const result = await countCategotres()
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
  background: url("../../assets/18.jpg") no-repeat;
  height: 100vh;
  background-size: 100%;
  overflow: scroll;
  padding-top: 45px;
  background-size: 100vw 100vh;
  background-attachment: fixed;
  box-sizing: border-box;
  .category-container-wrap {
    // color: rgba(255, 255, 255, 0.6);
    .category-container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, .8);
      margin-top: 30px;
      border-radius: 5px;
      padding: 40px;
      .count {
        font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
        text-align: center;
      }
      .items {
        display: flex;
        padding: 20px;
        flex-direction: column;
        .item {
          padding: 10px;
          cursor: pointer;
        }
      }
      .title {
        font-size: 26px;
        font-weight: 400;
        text-align: center;
        padding: 20px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .index {
    padding-top:31px;
    .category-container-wrap {
      .category-container {
        border-radius: 0px;
        padding: 40px 10px;
      }
    }
  }
}
</style>
