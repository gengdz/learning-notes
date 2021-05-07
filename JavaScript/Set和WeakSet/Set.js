const set1 = new Set([1, 2, 3, 4]);
console.log(set1) // { 1, 2, 3, 4 }
set1.delete(1);
console.log(set1);

const set1ToArr = [...set1];
console.log(set1ToArr, Array.from(set1))

const set2 = new Set([{ name: 1 }, { name: 1 }])
console.log(set2) // { { name: 1 }, { name: 1 } }

set2.add({ name: 1 })

console.log(set2.size, set2.has({ name: 1 }))

// const set3 = new Set(1, 2, 3); // 这种会报错
// console.log(set3);


const set3 = new Set('123456789');
const lte5 = new Set([...set3].filter(i => i <= 5));
console.log(lte5)

const arr3 = [1, 2, 3, 4, 5, 3, 2, 1];
const uniqueArr3 = [...new Set(arr3)];
console.log(uniqueArr3)

const set4 = new Set([1, 2, 3, 4]);
console.log(set4.values(), set4.keys(), set4.entries());

set4.forEach((value, index, arr) => console.log(value, index, arr));
for (const value of set4) {
  console.log(value)
}

const set5 = new Set([1, 2, 5, 6, 9]);
const set6 = new Set([1, 5, 9, 10, 8]);

const 并集 = new Set([...set5, ...set6]);
console.log(并集);

const 交集 = new Set([...set5].filter(i => !set6.has(i)))
console.log(交集);

const 差集 = new Set([...set5].filter(i => set6.has(i)));
console.log(差集)


