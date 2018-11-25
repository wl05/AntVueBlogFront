<template>
  <div class="index">
    <Spin v-if="listLoading" />
    <div v-else class="tags-container-wrap">
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
  </div>
</template>

<script>
import { getList } from '@/api/tags'
import item from './components/item'
import Spin from '@/components/Spin'

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
  background: url("../../assets/010.jpg") no-repeat;
  height: 100vh;
  background-size: 100%;
  overflow: scroll;
  padding-top: 45px;
  .tags-container-wrap {
    color: rgba(255, 255, 255, 0.6);
    .tags-container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(0, 0, 0, 0.9);
      margin-top: 30px;
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
      .tags-container-wrap {
        .tags-container {
          padding: 40px 10px;
          border-radius: 0px;

          .items {
            flex-wrap: wrap;
          }
        }
      }
    }
  }
}
</style>
