// flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]])

const flatten = (arr: any[]) => {
  const result = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const res = flatten(item);
      result.push(...res);
    }else {
      result.push(item)
    }
  });

  return result;
};

console.log('flatten', flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
