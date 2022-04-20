const nth = (list) => {
  const length = list.length;
  return new Proxy(list, {
    get(target, prop) {
      let key = Number(prop);
      while (key < 0) {
        key += length;
      }
      return target[key]
    }
  })
}


const list = nth([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(list[-1])
