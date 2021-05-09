const obj = {
  name: 'gdz'
}

const desc = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(JSON.stringify(desc, null, 2))

