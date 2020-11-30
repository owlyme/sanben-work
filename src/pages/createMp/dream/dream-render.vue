<script>
  // import draggable from "vuedraggable";

  // function createNodeMap(nodeList = []) {
  //   return nodeList.reduce((acc, node) => {
  //     return {
  //       ...acc,
  //       [node.id]: node,
  //       // rootId: acc.rootId === undefined ? node.id : acc.rootId > node.id ? node.id : acc.rootId
  //     }
  //   }, {})
  // }

  // function createNodeTree(nodeMap = {}) {
  //   let root = {children: []}
  //   for (let key in nodeMap) {
  //     let node = nodeMap[key];
  //     let parentNode = nodeMap[node.parentId] || root;
  //     if (!parentNode.children) {
  //       parentNode.children = []
  //     }
  //     parentNode.children.push(node)
  //   }

  //   return root
  // }

  // let nodeMap = createNodeMap(list)
  // console.log(createNodeTree(nodeMap))

  // const stop = (e, fn) => {
  //   e.stopImmediatePropagation();
  //   return fn
  // }

  export default {
    name: "dream",
    props: {
      comList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        activeId: null,
      }
    },
    render(h) {
      // console.log(this.comList)
      // let comList = createNodeTree(createNodeMap(this.comList)).children || []
      let comList = this.comList;
      let submit = this.submit;
      let removeItem = this.removeItem;
      let moveItem = this.moveItem;
      let editItem = this.editItem;
      let activeId = this.activeId;
      let resetAll = this.resetAll;

      const creatNode = (treeList) => {
        if (!treeList || !treeList.length) return "";
        return ( <ul> {treeList.map((item, index) => {
              return createTag(treeList, item, index, creatNode(item.children));
            })
          } </ul>
        );
      };

      const createTag = (parent, item, index, children) => {
        // console.log(item)
        let className = "item " + (activeId === item.id ? "active" : "");
        return ( <li class = {className} key ={item.id}>
          <div class = "component" > {item.component} 
            <div class = "childrem" > {children} </div>
          </div> 
          <div class="actions" >
          <button onClick = {() => removeItem(parent, item, index)} > remove </button> 
          <button onClick = {(e) => {e.stopImmediatePropagation();editItem(parent, item, index);}} >edit </button> 
          <button onClick = {() => moveItem(parent, item, index)}
          onMousedown = {() => console.log(item)}
          onMouseup = {() => console.log(item)} >move </button> 
          </div> 
          </li>
        );
      };

      return h(<div class = "dream" >
        <div class = "submit"onClick = {submit } >submit </div>
        <div class = "phoneSrceen"
        onClick = {resetAll} > {
          creatNode(comList)
        }</div>
        </div>
      );
    },
    components: {
      // draggable,
    },
    mounted() {},
    methods: {
      submit() {
        this.$emit("on-submit");
      },
      removeItem(parent, item, index) {
        this.$emit("on-remove", parent, item, index);
      },
      moveItem(parent, item, index) {
        this.$emit("on-move", parent, item, index);
      },
      editItem(parent, item, index) {
        this.activeId = this.activeId === item.id ? null : item.id;
        this.$emit("on-edit", parent, item, index);
      },
      resetAll() {
        this.activeId = null;
      },
    },
  };
</script>

<style lang="less">
  .dream {
    .phoneSrceen {
      border: 1px solid #999999;
      width: calc(375px + 20px);
      height: 667px;
      overflow-y: scroll;
      .item {
        position: relative;
        padding: 5px;
        width: 100%;
        min-height: 200px;
        border: 1px solid #e6e5e5;
        padding-bottom: 30px;
        &.active {
          border: 1px solid green;
        }
        .actions {
          position: absolute;
          bottom: 2px;
          right: 2px;
        }
      }
    }
  }
</style>