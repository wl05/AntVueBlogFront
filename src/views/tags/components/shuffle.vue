<template>
  <transition-group name="cell" tag="div" class="container">
    <div v-for="cell in cells" :key="cell.id" class="cell">
      <a
        class="tags-item-container"
        @click="$router.push({ path:`/tags/${cell._id}` })"
      >
        {{ cell.name }}
      </a>
    </div>
  </transition-group>
</template>

<script>
import lodash from 'lodash'

export default {

  props: [
    'list'
  ],
  watch: {
    list () {
      this.cells = this.list.map(function (_, index) {
        return {
          id: index,
          name: _.name,
          _id: _._id
        }
      })
      this.shuffleInterval()
    }
  },
  data () {
    return {
      timer: null,
      cells: []
    }
  },
  mounted () {
    this.shuffleInterval()
  },
  methods: {
    shuffleInterval () {
      this.timer = setInterval(() => {
        this.cells = lodash.shuffle(this.cells)
      }, 4000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    justify-content: center;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }

  .cell:nth-child(3n) {
    margin-right: 0;
  }

  .cell:nth-child(27n) {
    margin-bottom: 0;
  }

  .cell-move {
    transition: transform 3s;
  }

  .tags-item-container {
    border-bottom: 2px solid rgba(0, 0, 0, 0.6);
    cursor: pointer;
    margin: 15px;
    font-size: 18px;
  }

  .tags-item-container:hover {
    color: rgba(0, 0, 0, 1);
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
</style>
