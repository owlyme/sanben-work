<template>
  <div class="create-mp-index">
    <div class="flex-b flex-middle top">
      <h3>配置小程序页面</h3>
      <el-button type="primary" plain size="small" @click="onSubmit">生成文件类容</el-button>
    </div>
    <div class="flex container">
      <div class="component-list">
        <h4 class="part-top">组件列表</h4>
        <componentlist 
        @on-selected="onSelected" />
      </div>
      <div class="dream-part">
        <h4 class="part-top">
          <el-input size="mini" 
          style="text-align: center"
          placeholder="设置页面标题"
          type="text"
          v-model="nodeTree.pageTitle" />
        </h4>
        <dream 
          ref="dream"
          :treeNode="nodeTree"
          @on-remove="onRemoveItem" 
          @on-move="onMoveItem"
          @on-edit="onEdit"
          @on-order-change="onOrderChange" />
      </div>
      <div class="config">
        <h4 class="part-top">组件配置</h4>
        <config
        :component="currentEditorItem"
        @on-change="onComChange" />
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
  import { v4 as uuidv4 } from 'uuid';
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
          id: uuidv4(),
          pageTitle: "",
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
      setProperties(item) {
        return {
          ...item,
          id: uuidv4(),
          children: []
        }
      },
      appendChild(com) {
        let item = this.currentEditorItem
        if(item.tag === 'text') {
          this.$message({
            message: 'text组件不能添加子组件',
            type: 'warning'
          });
          return
        }
        com.parentId = item.id
        item.children.push(com)
      },
      onSelected(item) {
        let hasNewPropertiesItem = this.setProperties(item)
        this.appendChild(hasNewPropertiesItem)
        this.updateDream()
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
      onComChange(val) {
        // this.currentEditorItem.style= val
        Object.assign(this.currentEditorItem, val)
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
  .part-top {
    height: 28px;
    line-height: 28px;
    margin-bottom: 3px;
  }
}
.xyz .el-dialog__body {
  padding-top: 0px
}
</style>