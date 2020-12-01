const createSpace = (number) => {
  let str = ''
  while (number > 0) {
    str += '  '
    number--
  }
  return str
}
const createTagId = id => `sanben-${id}`
const convertKey = str => str.replace(/[A-Z]/g, s => '-' + (s || '').toLowerCase())

let css = null;
let PageJson = null;

function createStyle({ id, style }) {
  let styl = Object.entries(style).reduce((acc, [key, val]) => {
    return acc += `${createSpace(1)}${convertKey(key)}: ${val};\n`
  }, "")
  css += styl ? `#${createTagId(id)} {\n${styl}}\n` : ''
  return css
}

function createTag(other, children, space) {
  const { tag, id } = other;
  createStyle(other)
  createJson(other)
  return `${space}<${tag} id="${createTagId(id)}">${children && `\n${children}\n${space}`}</${tag}>`
}

function creatXml(treeList, level = 0) {
  if (typeof treeList === 'string' ) {
    return treeList
  }
  if (!treeList || !treeList.length) return ''
  let space = createSpace(level++)

  return treeList.map(({ children, ...other }) => {
    return createTag(other, creatXml(children, level), space)
  }).reduce((node1, node2) => node1 + '\n' + node2)
}

function createJson({pageTitle, tag, componentPath}) {
  console.log(pageTitle)
  // 判断是否为先程序原生组件 (暂时不做这种处理)
  // 添加组件引用关系
  // {
  //   "navigationBarTitleText": "这是标题",
  //   "usingComponents": {
  //      ···
  //      tagName: "../../components/tagName"
  //      tagName: path
  //   }
  // }
  if (pageTitle) PageJson.navigationBarTitleText = pageTitle;
  if (componentPath) {
    PageJson.usingComponents[tag] = componentPath;
  } else {
    PageJson.usingComponents[tag] = `../../components/${tag}`;
  }
}

export default function creatPage(treeList) {
  css = ''
  PageJson = {
    "navigationBarTitleText": "这是标题",
    "usingComponents": {}
  };
  let xml = creatXml(treeList)
  return {
    xml,
    css,
    json: JSON.stringify(PageJson, null, 2)
  }
}