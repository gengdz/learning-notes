// 包含多棵树的数组
const forest = [
  {
    id: 1,
    children: [{ id: 2, children: [{ id: 3 }, { id: 4 }] }],
  },
  {
    id: 5,
    children: [
      {
        id: 6,
        children: [{ id: 7 }],
      },
    ],
  },
];

// 将单棵树转换回扁平数组的函数
function flattenTree(node) {
  const array = [{ id: node.id }];
  if (node.children) {
    for (const child of node.children) {
      array.push(...flattenTree(child));
    }
  }
  return array;
}

// 将多棵树的数组扁平化的函数
function flattenForest(forest) {
  const result = [];
  for (const tree of forest) {
    result.push(...flattenTree(tree));
  }
  return result; // 返回扁平数组
}

// 示例使用
const flatArray = flattenForest(forest);
console.log(flatArray);

export {};
