<template>
  <div class="tag-container">
    <div class="tag-header-container">
      <el-dialog
        title="编辑"
        :visible="editUserVisible"
        width="30%"
        center
        @close="editUserVisible = false"
      >
        <el-form
          :model="editContent"
          :rules="rules"
          ref="ruleForm"
          label-position="right"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="editContent.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="editContent.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="editContent.checkPassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="$emit('close')">取 消</el-button>
          <el-button :loading="editLoading" type="primary" @click="confirmEdit(editContent)">确定</el-button>
        </span>
      </el-dialog>
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
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { update, getUserList } from '@/api/user'

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '' && this.editContent.password) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editContent.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      listLoading: false,
      createLoading: false,
      editLoading: false,
      editUserVisible: false,
      editContent: {
        password: '',
        checkPassword: '',
        name: ''
      },
      editId: '',
      rules: {
        checkPassword: [{ validator: validatePass, trigger: 'blur' }],
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.listLoading = true
      try {
        const result = await getUserList()
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.list = result.data.data
        }
      } catch (e) {
        this.$message.error('出错了')
      }
      this.listLoading = false
    },
    edit(id) {
      this.editUserVisible = true
      this.editContent.name = this.list.find(item => item._id === id).name
      this.editId = id
    },
    confirmEdit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.editUserVisible = false
          this.editLoading = true
          try {
            const result = await update(
              this.editId,
              this.editContent.name,
              this.editContent.password
            )
            if (result.data.code) {
              this.$message.error('编辑失败')
            } else {
              this.$message.success('编辑成功')
              this.getUserList()
            }
          } catch (e) {
            this.$message.error('出错了')
          }
          this.editLoading = false
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
</style>
