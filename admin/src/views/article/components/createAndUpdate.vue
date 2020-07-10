<template lang="html">
    <div class="create-container">
        <el-form :model="articleContent" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="title" label="文章标题">
                <el-input v-model="articleContent.title"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-select v-model="articleContent.category" :loading="getCategoriesLoading"
                           placeholder="请选择">
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签" prop="selectedTagValue">
                <el-select
                    v-model="articleContent.selectedTagValue"
                    :loading="listLoading"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in tags"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="date" label="日期">
                <el-date-picker
                    v-model="articleContent.date"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-upload
                    :headers="uploadHeaders"
                    :action="uploadUrl"
                    :multiple="false"
                    :file-list="fileList"
                    :on-success="upLoadSuccess"
                    :on-error="upLoadError"
                    :show-file-list="false"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <ul v-if="fileList.length > 0">
                    <li v-for="file in fileList" :key={file}>
                        {{file.name}}: {{file.url}}
                    </li>
                </ul>
            </el-form-item>
            <el-form-item>
                <Editor @onEditorChange="onEditorChange" :initialValue="markdownValue"></Editor>
            </el-form-item>
            <el-form-item>
                <el-button :loading="createLoading" type="primary" @click="publish">发布文章</el-button>
                <el-button :loading="saveDraftsLoading" @click="saveDrafts">存为草稿</el-button>
                <el-button v-if="$route.query.id" :loading="deleteArticleLoading" type="danger"
                           @click="deleteArticle($route.query.id)">删除
                </el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import Editor from './editor'
import { getList } from '@/api/tags'
import {
  createArticle,
  updateArticle,
  getArticleDetail,
  deleteArticle
} from '@/api/article'
import { getCategories } from '@/api/categories'

let authorization = ''
if (localStorage.getItem('token')) {
  authorization = `Bearer ${localStorage.getItem('token')}`
}
export default {
  name: 'CreateAndUpdate',
  data() {
    return {
      tags: [],
      listLoading: false,
      createLoading: false,
      saveDraftsLoading: false,
      uploadUrl: process.env.GATEWAY + '/img/upload',
      uploadHeaders: {
        authorization
      },
      fileList: [],
      articleContent: {
        title: '',
        content: {},
        selectedTagValue: '',
        date: '',
        category: ''
      },
      STATIC_DOMAIN: process.env.STATIC_DOMAIN,
      rules: {
        title: [
          {
            type: 'string',
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        selectedTagValue: [
          {
            type: 'string',
            required: true,
            message: '请选择标签',
            trigger: 'blur'
          }
        ],
        date: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        category: [
          {
            type: 'string',
            required: true,
            message: '请选择标签',
            trigger: 'blur'
          }
        ]
      },
      getArticleDetailLoading: false,
      deleteArticleLoading: false,
      categories: [],
      getCategoriesLoading: false
    }
  },
  computed: {
    markdownValue: function() {
      if (this.articleContent.content) {
        return this.articleContent.content.markdownValue
      } else {
        return ''
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getArticleDetail(this.$route.query.id)
    }
    this.getList()
    this.getCategories()
  },
  methods: {
    onEditorChange(val) {
      this.articleContent.content = val
    },
    async getCategories() {
      this.getCategoriesLoading = true
      try {
        const result = await getCategories()
        this.getCategoriesLoading = false
        if (result.data.code) {
          this.$message.error('获取分类失败')
        } else {
          this.categories = result.data.data
        }
      } catch (e) {
        this.getCategoriesLoading = false
        this.$message.error('出错了')
      }
    },
    async getArticleDetail(id) {
      this.getArticleDetailLoading = true
      try {
        const result = await getArticleDetail(id)
        this.getArticleDetailLoading = false
        if (result.data.code) {
          this.$message.error('出错了')
        } else {
          const {
            title,
            publishAt,
            markdownValue,
            htmlValue,
            tag,
            category
          } = { ...result.data.data }
          this.articleContent = {
            title,
            date: new Date(publishAt),
            content: {
              markdownValue,
              htmlValue
            },
            selectedTagValue: tag._id,
            category: category._id
          }
        }
      } catch (e) {
        this.getArticleDetailLoading = false
        this.$message.error('出错了')
      }
    },
    async getList() {
      this.listLoading = true
      try {
        const result = await getList()
        this.listLoading = false
        if (result.data.code) {
          this.$message.error('获取列表失败')
        } else {
          this.tags = result.data.data
        }
      } catch (e) {
        this.listLoading = false
        this.$message.error('出错了')
      }
    },
    deleteArticle(id) {
      this.$confirm('确定删除吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: async (action, instance) => {
          if (action === 'confirm') {
            this.deleteArticleLoading = true
            try {
              const result = await deleteArticle(id)
              this.deleteArticleLoading = false
              if (result.data.code) {
                this.$message.error('删除失败')
              } else {
                this.$message.success('删除成功')
                this.$router.push({ path: '/article/list' })
              }
            } catch (e) {
              this.deleteArticleLoading = false
              this.$message.error('出错了')
            }
          }
        }
      })
    },
    async publish() {
      const {
        title,
        content,
        selectedTagValue,
        date,
        category
      } = this.articleContent

      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.createLoading = true

          try {
            let res = null
            if (this.$route.query.id) {
              res = await updateArticle(this.$route.query.id, {
                title,
                tag: selectedTagValue,
                markdownValue: content.markdownValue
                  ? content.markdownValue
                  : '',
                htmlValue: content.htmlValue ? content.htmlValue : '',
                publishAt: Date.parse(date),
                publishStatus: '2',
                category
              })
            } else {
              res = await createArticle({
                title,
                tag: selectedTagValue,
                markdownValue: content.markdownValue
                  ? content.markdownValue
                  : '',
                htmlValue: content.htmlValue ? content.htmlValue : '',
                publishAt: Date.parse(date),
                publishStatus: '2',
                category
              })
            }
            this.createLoading = false
            if (res.data.code) {
              this.$message.error('发布失败')
            } else {
              this.$message.success('发布成功')
            }
          } catch (e) {
            this.createLoading = false
            this.$message.error('发布失败')
          }
        } else {
          return false
        }
      })
    },

    async saveDrafts() {
      const {
        title,
        content,
        selectedTagValue,
        date,
        category
      } = this.articleContent

      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.saveDraftsLoading = true
          try {
            let res = null
            if (this.$route.query.id) {
              res = await updateArticle(this.$route.query.id, {
                title,
                tag: selectedTagValue,
                markdownValue: content.markdownValue
                  ? content.markdownValue
                  : '',
                htmlValue: content.htmlValue ? content.htmlValue : '',
                publishAt: Date.parse(date),
                publishStatus: '1',
                category
              })
            } else {
              res = await createArticle({
                title,
                tag: selectedTagValue,
                markdownValue: content.markdownValue
                  ? content.markdownValue
                  : '',
                htmlValue: content.htmlValue ? content.htmlValue : '',
                publishAt: Date.parse(date),
                publishStatus: '1',
                category
              })
            }

            this.saveDraftsLoading = false
            if (res.data.code) {
              this.$message.error('发布失败')
            } else {
              this.$message.success('发布成功')
            }
          } catch (e) {
            this.saveDraftsLoading = false
            this.$message.error('保存失败')
          }
        } else {
          return false
        }
      })
    },

    upLoadSuccess(response, file, fileList) {
      if (response.code) {
        this.$message.error('上传失败')
      } else {
        this.$message.success('上传成功')

        this.fileList = this.fileList.concat(
          response.data.files.ops.map((item, index) => {
            item.url = this.STATIC_DOMAIN + item.url
            return item
          })
        )
      }
    },
    upLoadError(response, file, fileList) {
      this.$message.error('上传失败')
    }
  },
  components: {
    Editor
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.create-container {
  padding: 30px;
  margin-bottom: 100px;
  .operation-btn-container {
    margin: 20px 0;
  }
}
</style>
