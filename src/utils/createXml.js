const createSpace = (number) => {
  let str = ''
  while (number > 0) {
    str += '  '
    number--
  }
  return str
}
const createId = id => `sanben-${id}`
const convertKey = str => str.replace(/[A-Z]/g, s => '-' + (s || '').toLowerCase())
let css = '';

function createStyle({ id, style }) {
  let styl = Object.entries(style).reduce((acc, [key, val]) => {
    return acc += ` ${convertKey(key)}: ${val};\n`
  }, "")
  return styl ? `#${createId(id)} {\n${styl}}\n` : ''
}

function createTag(other, children, space) {
  const { tag, id } = other;
  css += createStyle(other)
  return `${space}<${tag} id="${createId(id)}">${children && `\n${children}\n${space}`}</${tag}>`
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

export default function creatPage(treeList) {
  css = ''
  let xml = creatXml(treeList)
  return {
    xml,
    css
  }
}