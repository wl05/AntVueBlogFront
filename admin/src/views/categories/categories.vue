<template>
    <div class="tag-container">
        <div class="tag-header-container">
            <el-button
                style="margin-left: 10px;"
                type="primary"
                icon="el-icon-edit"
                @click="createDialogVisible = true"
            >添加</el-button>
            <el-dialog
                title="创建分类"
                :visible="createDialogVisible"
                width="30%"
                center
                @close="createDialogVisible = false"
            >
                <el-form :model="tagForm" label-position="right" label-width="80px">
                    <el-form-item
                        label="分类名称"
                        :rules="[{ required: true, message: '请输入分类名称', trigger: 'blur' }]"
                    >
                        <el-input v-model="tagForm.name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="createDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="create" :loading="createLoading">创 建</el-button>
                </span>
            </el-dialog>
            <editCategories
                @close="editCategoriesVisible=false"
                @confirm="confirmEdit"
                :visible="editCategoriesVisible"
                :content="editContent"
                :loading="editLoading"
            />
        </div>
        <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
        >
            <el-table-column align="center" label="ID" width="95">
                <template slot-scope="scope">{{ scope.$index }}</template>
            </el-table-column>
            <el-table-column label="名称">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                width="230"
                class-name="small-padding fixed-width"
            >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="edit(scope.row._id)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        :loading="deleteLoading"
                        @click="deleteCategory(scope.row._id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { create, getCategories, update, deleteCategory } from '@/api/categories'
import editCategories from './compoents/editCategories'

export default {
  data() {
    return {
      /* get list */
      list: null,
      listLoading: false,
      /* create */
      createDialogVisible: false,
      tagForm: {
        name: ''
      },
      createLoading: false,
      /* edit */
      editLoading: false,
      editCategoriesVisible: false,
      editContent: {},
      /* warning */
      warningVisible: false,
      deleteLoading: false
    }
  },
  components: {
    editCategories
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    edit(id) {
      this.editCategoriesVisible = true
      this.editContent = this.list.find(item => item._id === id)
    },
    async confirmEdit(editedContent) {
      this.editCategoriesVisible = false
      this.editLoading = true
      try {
        const result = await update(
          editedContent._id,
          editedContent.name
        )
        this.editLoading = false
        if (result.data.code) {
          this.$message.error('编辑失败')
        } else {
          this.$message.success('编辑成功')
          this.getCategories()
        }
      } catch (e) {
        this.editLoading = false
        this.$message.error('出错了')
      }
    },

    deleteCategory(id) {
      this.$confirm('删除分类将删除分类相关的所有文章', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            this.confirmDeleteCategory(id)
          }
        }
      })
    },
    async confirmDeleteCategory(id) {
      this.deleteLoading = true
      try {
        const result = await deleteCategory(id)
        this.deleteLoading = false
        if (result.data.code) {
          this.$message.error('删除失败')
        } else {
          this.$message.success('删除成功')
          this.getCategories()
        }
      } catch (e) {
        this.deleteLoading = false
        this.$message.error('出错了')
      }
    },
    async getCategories() {
      this.listLoading = true
      try {
        const result = await getCategories()
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
    },
    async create() {
      this.createDialogVisible = false
      this.createLoading = true
      try {
        const result = await create(this.tagForm.name)
        this.createLoading = false
        if (result.data.code) {
          this.$message.error('创建失败')
        } else {
          this.$message.success('创建成功')
          this.getCategories()
        }
      } catch (e) {
        this.createLoading = false
        this.$message.error('出错了')
      }
    }
  }
}
</script>

<style scoped type="scss">
.tag-header-container {
    padding: 20px;
}
</style>
