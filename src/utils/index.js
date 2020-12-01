let list = [{
    parentId: -1,
    id: 0
  },
  {
    parentId: -1,
    id: 1
  },
  {
    parentId: -1,
    id: 2
  },
  {
    parentId: 0,
    id: 3
  },
  {
    parentId: 3,
    id: 4
  }
]


function createNodeMap(nodeList = []) {
  return nodeList.reduce((acc, node) => {
    return {
      ...acc,
      [node.id]: node,
      // rootId: acc.rootId === undefined ? node.id : acc.rootId > node.id ? node.id : acc.rootId
    }
  }, {})
}

function createNodeTree(nodeMap = {}) {
  let root = {}
  for (let key in nodeMap) {
    let node = nodeMap[key];
    let parentNode = nodeMap[node.parentId] || root;
    if (!parentNode.children) {
      parentNode.children = []
    }
    parentNode.children.push(node)
  }

  return root
}

let nodeMap = createNodeMap(list)

console.log(createNodeTree(nodeMap))