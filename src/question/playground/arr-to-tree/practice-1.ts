export {};

const data = [
  { id: 5, parentId: 2 },
  { id: 2, parentId: 1 }, // id为1的子节点
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 }, // id为2的子节点
  { id: 6, parentId: 3 }, // id为3的子节点
  { id: 1, parentId: null }, // 根节点
  { id: 7, parentId: 3 },
  { id: 8, parentId: 4 }, // id为4的子节点
  { id: 9, parentId: 5 }, // id为5的子节点
  { id: 10, parentId: 7 }, // id为7的子节点
];

const arr2tree = (arr = data) => {
  const map = arr.reduce(
    (acc, cur) => ({ ...acc, [cur.id]: { ...cur, children: [] } }),
    {},
  );

  return arr.reduce((acc, cur) => {
    const current = map[cur.id];
    if (cur.parentId === null) {
      acc.push(current);
    } else {
      map[cur.parentId].children.push(current);
    }
    return acc;
  }, []);
};

console.log('arr2tree', JSON.stringify(arr2tree(data), null, 2));
