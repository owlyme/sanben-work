<template>
  <div class="index">
    <div class="flex">
      <div class="component-list">
        <componentlist 
        @on-selected="onSelected" />
      </div>
      <div class="dream">
        <dream 
          ref="dream"
          :treeNode="nodeTree"
          @on-submit="onSubmit" 
          @on-remove="onRemoveItem" 
          @on-move="onMoveItem"
          @on-edit="onEdit"
          @on-order-change="onOrderChange" />
      </div>
      <div class="config">
        <config :comp="currentEditorItem.style" 
        @on-style-change="onStyleChange" />
      </div>
    </div>
    <fileContent></fileContent>
  </div>
  
</template>

<script>
  import componentlist from './componentlist/componentlist'
  import dream from './dream/dream'
  import config from './config/config'
  import fileContent from './fileContent/fileContent'
  import createXml from '@/utils/createXml'
  export default {
    name: 'index',
    provide: {},
    data() {
      return {
        currentIndex: 0,
        editorIndex: -1,
        selectedComponentList: [],
        currentEditorItem: {},
        pageStyle: {},
        compStyle: {},
        nodeTree: {
          tag: 'view',
          id: -1,
          style: {
            background: 'none',
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            borderRadius: 0
          },
          children: []
        }
      }
    },
    components: {
      componentlist,
      dream,
      fileContent,
      config
    },
    watch: {},
    mounted() {
      this.currentEditorItem = this.nodeTree
    },
    methods: {
      onSelected(item) {
        console.log(item)
        if (~this.editorIndex) {
          this.appendChild(item)
        } else {
          this.nodeTree.children.push(item)
        }
      },
      onSubmit() {
        console.log(this.nodeTree)
        console.log(createXml([this.nodeTree]))
      },
      onRemoveItem(parent, item, index) {
        parent.splice(index, 1)
        let curItem = this.currentEditorItem
        if (!curItem && item.id == curItem.id) {
          this.editorIndex = -1
        }
        this.updateDream()
      },
      onMoveItem(parent, item, index) {
        console.log("onMoveItem", parent, index, item)
      },
      onEdit(parent, item, index) {
        console.log("onEdit", parent, index, item)
        this.editorIndex = index !== null ? index : -1
        this.currentEditorItem = index !== null ? item : this.nodeTree
      },
      appendChild(com) {
        let item = this.currentEditorItem
        if (!item.children) {
          item.children = []
        }
        com.parentId = item.id
        item.children.push(com)
        this.updateDream()
      },
      updateDream() {
        this.$refs.dream.$forceUpdate()
      },
      onOrderChange(parent, val) {
        if (parent === null) {
          this.selectedComponentList = val
        } else {
          parent.children = val
        }
        this.updateDream()
      },
      onStyleChange(val) {
        this.currentEditorItem.style= val
        this.updateDream()
      }
    }
  }
</script>

<style lang="less">
.directives{
  border-radius: ;
}
</style>