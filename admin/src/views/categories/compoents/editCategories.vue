<template>
    <el-dialog title="编辑" :visible="visible" width="30%" center @close="$emit('close')">
        <el-form :model="editContent" label-position="right" label-width="80px">
            <el-form-item
                label="分类名称"
                :rules="[{ required: true, message: '请输入分类名称', trigger: 'blur' }]"
            >
                <el-input v-model="editContent.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('close')">取 消</el-button>
            <el-button :loading="loading" type="primary" @click="$emit('confirm',editContent)">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted: {
    editContent() {
      return { ...this.content }
    }
  }
}
</script>

<style scoped type="scss">
</style>
