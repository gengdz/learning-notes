const data = {
  title: '浅拷贝对象',
  dataIndex: 'first',
  componentProps: {
    path: 'user/',
    mode: 'add',
  }
}

const o1 = Object.assign({}, data)
const o2 = { ...data }

function copyObj(o) {
  let res = {};
  for (const key in o) {
    res[key] = o[key];
  }
  return res;
}
console.log(copyObj(data))

console.log('o1', o1)
data.title = '换对象了'
data.componentProps.path = "修改了path"
console.log('o1:', o1)
o2.title = 'o2 title'
console.log('o2:', o2)
console.log('data:', data)