<template>
  <div class="tag-container">
    <div class="tag-header-container">
      <el-button
        @click="$router.push('/article/create')"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
      >发布文章</el-button>
    </div>
    <el-table
      v-loading="fetchArticleLoading"
      :data="articleList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :height="619"
    >
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">{{ scope.$index + (pageSize-1)*pageLimit+1 }}</template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="发布时间" width="160">
        <template slot-scope="scope">{{ formatTimestamp(Number(scope.row.publishAt) /1000) }}</template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==='2'" type="danger">删除</el-tag>
          <el-tag v-else-if="scope.row.publishStatus==='1'">草稿</el-tag>
          <el-tag v-else type="success">已发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push({path:'/article/create',query:{id:scope.row._id}})"
          >编辑</el-button>
          <el-button
            :loading="deletingId === scope.row._id && deleteArticleLoading"
            size="mini"
            type="danger"
            @click="deleteArticle(scope.row._id)"
          >删除</el-button>
          <el-button
            size="mini"
            type="success"
            @click="$router.push({name:'Detail',params:{id:scope.row._id}})"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageLimit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { deleteArticle } from '@/api/article'
import formatTimestamp from '@/utils/formatTimestamp'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      fetchArticleLoading: false,
      pageSize: 1,
      pageLimit: 10,
      deleteArticleLoading: false,
      deletingId: ''
    }
  },
  computed: {
    ...mapState('article', ['articleList', 'count'])
  },
  mounted() {
    this.fetchArticle(this.pageSize, this.pageLimit)
  },
  methods: {
    ...mapActions('article', ['FetchArticle']),
    formatTimestamp(timestamp) {
      return formatTimestamp(timestamp)
    },
    handleSizeChange(val) {
      this.pageLimit = val
      this.fetchArticle(this.pageSize, val)
    },
    handleCurrentChange(val) {
      this.pageSize = val
      this.fetchArticle(val, this.pageLimit)
    },
    async fetchArticle(pageSize, pageLimit) {
      this.fetchArticleLoading = true
      try {
        await this.FetchArticle({ pageSize, pageLimit })
        this.fetchArticleLoading = false
      } catch (e) {
        this.fetchArticleLoading = false
        this.$message.error('获取列表失败')
      }
    },
    deleteArticle(id) {
      this.$confirm('确定删除吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: async (action, instance) => {
          if (action === 'confirm') {
            this.deletingId = id
            this.deleteArticleLoading = true
            try {
              const result = await deleteArticle(id)
              this.deleteArticleLoading = false
              if (result.data.code) {
                this.$message.error('删除失败')
              } else {
                this.$message.success('删除成功')
                this.fetchArticle(this.pageSize, this.pageLimit)
              }
            } catch (e) {
              this.deleteArticleLoading = false
              this.$message.error('出错了')
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped type="scss">
.tag-header-container {
  padding: 20px;
}

.pagination {
  padding: 20px;
}
</style>
