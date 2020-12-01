
<script>
import draggable from "vuedraggable";
import componentPreview from "../componentPreview/componentPreview";
export default {
  name: "dream",
  render() {
    // console.log(this.treeNode)
    // let treeNode = createNodeTree(createNodeMap(this.treeNode)).children || []
    let treeNode = this.treeNode;
    let removeItem = this.removeItem;
    let moveItem = this.moveItem;
    let editItem = this.editItem;
    let activeId = this.activeId;
    let resetAll = this.resetAll;

    const creatNode = (treeList, parent = null) => {
      if (typeof treeList === 'string' ) {
        return treeList
      }
      if (!treeList || !treeList.length) return "";
      return (<ul>
        <draggable value={treeList} onInput={(val) => {this.onOrderChange(parent, val)}}> 
          {
            treeList.map((item, index) => {
              return createTag(treeList, item, index, creatNode(item.children, item));
            })
          }
        </draggable>
      </ul>
      );
    };

    const createTag = (parent, item, index, children) => {
      // console.log(item)
      let className = "item " + (activeId === item.id ? "active" : "");
      return (<li class={className} key ={item.id}>
          <div class="component" style={item.style}> 
            {item.tag}
            <componentPreview name={item.component} >{children}</componentPreview>
          </div>

          <div class="actions" >
            <el-button 
              type="primary" 
              icon="el-icon-edit" circle
              size="mini" 
              onClick = {(e) => {e.stopImmediatePropagation();editItem(parent, item, index);}} />
               
            <el-button  type="primary"  icon="el-icon-rank" circle
              size="mini" 
              onClick = {() => moveItem(parent, item, index)} />

            <el-button 
              type="danger" 
              icon="el-icon-delete" 
              circle
              size="mini" 
              onClick = {() => removeItem(parent, item, index)} />
          </div> 
        </li>
      );
    };

    return <div class = "dream" >
      <div class="phoneSrceen"
        style={treeNode.style}
        onClick = {resetAll} >
        {creatNode(treeNode.children)}
      </div>
    </div>
  },
  props: {
    treeNode: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      activeId: null
    }
  },
  components: {
    draggable,
    componentPreview
  },
  mounted() {},
  methods: {
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
      // console.log('resetAll')
      this.editItem(null, {id: null}, null)
    },
    onOrderChange(parent, val) {
      // console.log(val)
      this.$emit("on-order-change", parent, val);
    }
  },
};
</script>

<style lang="less">
.dream {
  .phoneSrceen {
    border: 1px solid #999999;
    width: calc(375px + 20px);
    height: 667px;
    overflow-y: auto;
    .item {
      position: relative;
      // padding: 5px;
      width: 100%;
      // min-height: 200px;
      .component {
        border: 1px solid #e6e5e5;
      }
      
      .actions {
        position: absolute;
        bottom: 2px;
        right: 2px;
        display: none;
        z-index: 10;
        // transform: scale(0.8);
      }
      &.active {
        border: 1px solid green;
        > .actions {
          display: block;
        }
      }
      &:hover > .actions {
        display: block;
      }
    }
  }
}
</style>
