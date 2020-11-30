<template>
  <div class="fileContent">
    <div>
      <h4 class="flex-b flex-middle">
        <span>html部分</span>  
        <el-button  plain
        size="small"
          class="html"
          data-clipboard-action="copy" 
          data-clipboard-target="#html"
          >复制</el-button>
      </h4>
      <div>
        <pre id="html">{{data.xml}}</pre>
      </div>
      <h4 class="flex-b flex-middle">
        <span>css部分</span>   
        <el-button  plain
        size="small"
          class="css"
          data-clipboard-action="copy" 
          data-clipboard-target="#css"
          >复制</el-button>
      </h4>
      <div>
        <pre id="css">{{data.css}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'; 
  export default {
    name: 'fileContent',
    props: {
      data: {
        type: Object,
        default: () => ({
          xml: null,
          css: null
        })
      }
    },
    data() {
      return {

      }
    },
    created() {
      
    },
    components: {},
    watch: {},
    mounted() {
      new Clipboard('.css', {
        container: document.getElementById('css')
      }).on('success', (e) => {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        e.clearSelection();
      });

      new Clipboard('.html', {
        container: document.getElementById('html'),
      }).on('success', (e) => {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        e.clearSelection();
      });
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
.fileContent {
  height: 600px;
  overflow-y: auto ;
}
</style>