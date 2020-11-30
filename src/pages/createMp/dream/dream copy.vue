<template>
  <div>
  <div class="submit" @click="submit">
        submit
  </div>
  <div class="dream">
    <ul>
      <li class="item" v-for="(item, index) in comList" :key="index">
        <div class="component">
          {{item.component}}
        </div>
        <div class="actions">
          <button @click="removeItem(index, item)">remove</button>
          <button @click="editItem(index, item)">edit</button>
          <button @click="moveItem(index, item)">move</button>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  export default {
    name: 'dream',
    props: {
      comList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {

      }
    },

    components: {},
    watch: {},
    mounted() {},
    methods: {
      submit() {
        this.$emit('on-submit')
      },
      removeItem(index, item) {
        this.$emit('on-remove', index, item)
      },
      moveItem(index, item) {
        this.$emit('on-move', index, item)
      },
      editItem(index, item) {
        this.$emit('on-edit', index, item)
      },
    }
  }
</script>

<style scoped lang="less">
  .dream {
    border: 1px solid #999999;
    width: calc(375px + 20px);
    height: 667px;
    overflow-y: scroll;
    .item {
      position: relative;
      padding: 10px;
      width: 375px;
      height: 200px;
      border: 1px solid #e6e5e5;
      .actions {
        position: absolute;
        bottom: 2px;
        right: 2px;
      }
    }
  }
</style>