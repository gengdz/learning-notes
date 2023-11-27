namespace A {
  function nextCharForNumberString(str) {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number + 1;
    return String.fromCharCode(nextNumber);
  }

  const result = nextCharForNumberString(' 64');
  console.log(result); // "A"
}


namespace B {
  // 借助 Array
  const nextCharForNumberString = str =>
    [str]
      .map(s => s.trim())
      .map(s => parseInt(s))
      .map(i => i + 1)
      .map(i => String.fromCharCode(i));

  const result = nextCharForNumberString(' 64');
  console.log(result); // ["A"]
}


namespace C {
  // 自己实现一个类似 Array 的 Box
  const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
  })

  const nextCharForNumberString = str =>
    Box(str)
      .map(s => s.trim())
      .map(s => parseInt(s))
      .map(i => i + 1)
      .map(i => String.fromCharCode(i))
      .inspect();

  const result = nextCharForNumberString(' 64');
  console.log(result); // "Box(A)"

}

namespace C {
  // 使用 of 将值放入 Functor
  const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
  })
  Box.of = x => Box(x);

  const result = Box.of(' 64')
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .inspect();

  console.log(result); // "Box(A)"

}


namespace D {
  // Box 不仅可以放值，还可以放函数
  const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
  })

  const f0 = x => x * 100;
  const add1 = f => x => f(x) + 1;
  const add2 = f => x => f(x) + 2;
  const g = Box(f0).map(add1).map(add2).fold(f => f);
  const res = g(1);
  console.log(res)
}


