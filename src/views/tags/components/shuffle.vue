<template>
  <transition-group name="cell" tag="div" class="shuffle">
    <div v-for="cell in cells" :key="cell.id" class="cell">
      <a
        class="shuffle__tags"
        @click="$router.push({ path:`/tags/${cell._id}` ,query: {name:cell.name}})"
      >
        {{ cell.name }}
      </a>
    </div>
  </transition-group>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  watch: {
    list () {
      this.cells = this.list.map(function (_, index) {
        return {
          id: index,
          name: _.name,
          _id: _._id
        }
      })
    }
  },
  data () {
    return {
      cells: []
    }
  }
}
</script>
<style lang="scss">
  .shuffle {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    justify-content: center;
    &__tags {
      border-bottom: 2px solid rgba(0, 0, 0, 0.6);
      cursor: pointer;
      margin: 15px;
      font-size: 18px;
      font-family: Georgia, serif;
    }
    &__tags:hover {
      color: rgba(0, 0, 0, 1);
      border-bottom: 2px solid rgba(0, 0, 0, 1);
    }
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


</style>
