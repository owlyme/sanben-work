<template>
  <div class="componentlist">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="selected(item)">
        {{item.component}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'componentlist',
    data() {
      return {
        list: [{
          tag: "view",
          component: "view"
        }, {
          tag: "copyText",
          component: "copyText"
        }]
      }
    },
    components: {},
    watch: {},
    mounted() {
      this.id = 0
    },
    methods: {
      selected(item) {
        // console.log(item)
        this.$emit('on-selected', {
          ...item,
          id: this.id++,
          parentId: -1
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .componentlist {
    border: 1px solid #999999;
    padding: 5px 10px;
    li {
      margin: 10px;
    }
  }
</style>