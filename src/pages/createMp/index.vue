<template>
  <div class="index">
    <div class="flex-a">
      <div class="component-list">
        <componentlist 
        @on-selected="onSelected" />
      </div>
      <div class="dream">
        <dream 
          ref="dream"
          :comList="selectedComponentList"
          @on-submit="onSubmit" 
          @on-remove="onRemoveItem" 
          @on-move="onMoveItem"
          @on-edit="onEdit"
          @on-order-change="onOrderChange" />
      </div>
    </div>

    <fileContent></fileContent>
  </div>
  
</template>

<script>
  import componentlist from './componentlist/componentlist'
  import dream from './dream/dream'
  import fileContent from './fileContent/fileContent'
  import createXml from '@/utils/createXml'
  export default {
    name: 'index',
    provide: {

    },
    data() {
      return {
        currentIndex: 0,
        editorIndex: -1,
        selectedComponentList: []
      }
    },
    components: {
      componentlist,
      dream,
      fileContent
    },
    watch: {},
    mounted() {},
    methods: {
      onSelected(item) {
        console.log(item)
        if (~this.editorIndex) {
          this.appendChild(item)
        } else {
          this.selectedComponentList.push(item)
        }
      },
      onSubmit() {
        console.log(this.selectedComponentList)
        let treeList = [{
          tag: 'view',
          children: this.selectedComponentList
        }]
        console.log(createXml(treeList))
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
        this.editorIndex = index
        this.currentEditorItem = item
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
      }
    }
  }
</script>

<style lang="less">

</style>