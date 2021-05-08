for (let i = 1; i <= 3; i++) {
  console.log(`let 中 i --> ${i}`)
}

// console.log(i)// 报错没定义

for (var j = 1; j <= 3; j++) {
  console.log(`var 中 i --> ${j}`)
}

console.log(j) // 4 不会报错


for (var k = 1; k <= 3; k++) {
  setTimeout(() => {
    console.log(k) // 4 4 4 
  }, 1000);
}

for (var k = 1; k <= 3; k++) {
  (function (i) {
    setTimeout(() => {
      console.log(i)
    }, 1000);
  })(k)
}



for (let k = 1; k <= 3; k++) {
  setTimeout(() => {
    console.log(k) // 1 2 3
  }, 1000);
}

