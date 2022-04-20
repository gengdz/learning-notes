const obj = {
  name: 'gdz',
  age: 27
}

const desc = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(JSON.stringify(desc, null, 2));


const descs = Object.getOwnPropertyDescriptors(obj);
console.log(descs)

