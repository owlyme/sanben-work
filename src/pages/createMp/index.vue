<template>
  <div class="create-mp-index">
    <div class="flex-b flex-middle top">
      <h3>配置小程序页面</h3>
      <el-button type="primary" plain size="small" @click="onSubmit">生成文件类容</el-button>
    </div>
    <div class="flex container">
      <div class="component-list">
        <h4>组件列表</h4>
        <componentlist 
        @on-selected="onSelected" />
      </div>
      <div class="dream-part">
        <dream 
          ref="dream"
          :treeNode="nodeTree"
          @on-remove="onRemoveItem" 
          @on-move="onMoveItem"
          @on-edit="onEdit"
          @on-order-change="onOrderChange" />
      </div>
      <div class="config">
        <h4>组件配置</h4>
        <config :comp="currentEditorItem.style" 
        @on-style-change="onStyleChange" />
      </div>
    </div>
    
    <el-dialog title="文本内容" 
    width="800"
    :visible.sync="dialogTableVisible" 
    custom-class="xyz">
      <fileContent :data="formatData"></fileContent>
    </el-dialog>
  </div>
</template>

<script>
  import componentlist from './componentlist/componentlist'
  import dream from './dream/dream'
  import config from './config/config'
  import fileContent from './fileContent/fileContent'
  import creatPage from '@/utils/createXml'
  export default {
    name: 'create-mp-index',
    provide: {},
    data() {
      return {
        dialogTableVisible: false,
        currentIndex: 0,
        editorIndex: -1,
        selectedComponentList: [],
        currentEditorItem: {},
        nodeTree: {
          tag: 'view',
          id: -1,
          style: {
            background: 'none',
            margin: '0',
            padding: '0',
            borderRadius: 0
          },
          children: []
        },
        // formatData 
        formatData: {
          xml: '',
          css: ''
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
        this.formatData = creatPage([this.nodeTree])
        this.dialogTableVisible = true
        console.log(this.formatData)
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
          // this.selectedComponentList = val
          this.nodeTree.children = val
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
.create-mp-index {
  .top {
    padding: 3px 10px;
    box-shadow: 0px 0px 1px 0px rgba(153, 153, 153, 0.6);
  }
  .container {
    margin-top: 5px;
    padding: 0 10px;
  }
  .dream-part {
    margin: 0 10px;
  }
}
.xyz .el-dialog__body {
  padding-top: 0px
}
</style>