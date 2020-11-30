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
import { v4 as uuidv4 } from 'uuid';
  export default {
    name: 'componentlist',
    data() {
      return {
        list: [{
          tag: "helloworld",
          component: "helloworld"
        }, {
          tag: "copyText",
          component: "copyText"
        }, {
          tag: "text",
          component: "text"
        }, {
          tag: "h3",
          component: "h3"
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
          id: uuidv4(),
          parentId: -1,
          style: {}
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
      cursor: pointer;
    }
  }
</style>