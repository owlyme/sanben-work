const createSpace = (number) => {
  let str = ''
  while (number > 0) {
    str += '  '
    number--
  }
  return str
}

function creatXml(treeList, level = 0) {
  if (!treeList || !treeList.length) return ''
  let space = createSpace(level++)

  return treeList.map(({ children, ...other }) => {

    return createTag(other, creatXml(children, level), space)
  }).reduce((node1, node2) => node1 + '\n' + node2)
}

function createTag(other, children, space) {
  const { tag } = other;

  return `${space}<${tag}>${children && `\n${children}\n${space}`}</${tag}>`
}

function createStyle(node) {

}
// function compListToTree(comList) {
//   return 
// }
export default creatXml