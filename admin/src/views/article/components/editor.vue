<template lang="html">
    <mark-down
        @on-save="save"
        :autoSave="true"
        :initialValue="initialValue"
        :interval="1000"
    />
</template>

<script>
import MarkDown from 'vue-meditor'

export default {
  props: {
    initialValue: {
      type: String,
      default: ''
    }
  },
  name: 'Editorbar',
  components: {
    MarkDown
  },
  methods: {
    save: function(val) {
      this.$emit('onEditorChange', val)
    }
  }
}
</script>
