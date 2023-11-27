const obj = {
  name: 'gdz',
  age: 20
}

const arr = ['a', 'b', 'c']

for (const o in obj) {
  console.log('oooo for of', o)
}

for (const key in obj) {
  if (Object.hasOwnProperty.call(obj, key)) {
    const element = obj[key];
    console.log('oooo11 for of', element)
  }
}