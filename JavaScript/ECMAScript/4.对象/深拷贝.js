const data = {
  title: '深拷贝对象',
  dataIndex: 'first',
  componentProps: {
    path: 'user/',
    mode: 'add',
  }
}

const arrayData = [
  {
    label: '前端',
    value: 'front'
  }, {
    label: '后端',
    value: 'end'
  }
]

// 需要提前知道的知识
console.log('对象的entries方法', JSON.stringify(Object.entries(data), null, 2));
console.log('数组对象的entries方法', JSON.stringify(Object.entries(arrayData), null, 2));



// 深拷贝能做的事情就是一层层的进行拷贝
function deepCopy(obj) {
  let res = obj instanceof Array ? [] : {};
  for (const [k, v] of Object.entries(obj)) {
    res[k] = typeof v === "object" ? deepCopy(v) : v;
  }
  return res;
}

const o1 = deepCopy(data)
console.log('深拷贝 o1: ', o1)

data.componentProps.mode = 'edit';
console.log(`修改了data之后的 o1 : ${JSON.stringify(o1, null, 2)}`)

o1.componentProps.path = '修改了o1 的path'
console.log(`修改了o1之后的 data : ${JSON.stringify(data, null, 2)}`)

console.log(o1)




const a1 = deepCopy(arrayData);
const a2 = JSON.parse(JSON.stringify(arrayData))

arrayData[0].label = 'React';
console.log('a1', a1)

a1[1].label = 'Spring Boot';
console.log('arrayData', arrayData)

console.log('a1', a1)

