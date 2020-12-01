<template>
  <div class="componentlist">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="selected(item)" 
      class="flex-b">
        <span>{{item.tag}}</span>
        <span 
        @click.stop="() => {showDrawer = true; previewComponent = item}"
        ><i class="el-icon-view icon"></i> </span>
      </li>
    </ul>

    <el-drawer
      title="预览组件"
      :visible.sync="showDrawer"
      size="400px"
      :modal="false"
      :wrapperClosable="false">
      <componentPreview :name="previewComponent.component" />
    </el-drawer>
  </div>
</template>

<script>
  import componentPreview from "../componentPreview/componentPreview";
  export default {
    name: 'componentlist',
    data() {
      return {
        previewComponent: {
          tag: "helloworld",
          component: "helloworld"
        },
        showDrawer: false,
        list: [
          // 一个完成的数据
          // {
          //   tag: "helloworld", // 组件标签名
          //   style: {},  // 组件边框样式
          //   component: "helloworld", // 组件名
          //   componentPath: "" // 组件在小程序项目目录的位置
          //   children: [] // 子节点
          // },
          {
            tag: "helloworld",
            component: "helloworld"
          },
          {
            tag: "copyText",
            component: "copyText"
          },
          {
            tag: "view",
            component: "div"
          },
          {
            tag: "text",
            component: "span"
          },
        ]
      }
    },
    components: {
      componentPreview
    },
    mounted() {
      this.id = 0
    },
    methods: {
      selected(item) {
        // console.log(item)
        this.$emit('on-selected', {
          ...item,
          style: {}
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .componentlist {
    border: 1px solid rgba(153, 153, 153, 0.3);
    padding: 5px 10px;
    li {
      margin: 10px;
      width: 100%;
      cursor: pointer;
      .icon {
        visibility: hidden;

      }
      &:hover .icon{
        visibility: visible;
      }
    }
    /deep/ :focus {
      outline: 0;
    }
    /deep/ .el-drawer__wrapper {
      position: fixed;
      top: 0px;
      right: 0;
      bottom: 0;
      left: 50%;
      overflow: hidden;
      margin: 0;
    }
  }
</style>