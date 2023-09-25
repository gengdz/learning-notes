export const data = [
  {
    value: '1',
    label: 'a',
    children: [
      {
        value: '1-1',
        label: 'a-a',
        children: [
          {
            value: '1-1-1',
            label: 'a-a-a',
          },
          {
            value: '1-1-2',
            label: 'a-a-b',
          },
        ],
      },
      {
        value: '1-2',
        label: 'a-b',
      },
    ],
  },
  {
    value: '2',
    label: 'b',
  },
  {
    value: '3',
    label: 'c',
  },
];

const dfs = (list: typeof data) => {
  if (!list) {
    return;
  }
  const result: any[] = [];
  list.forEach((item) => {
    const newItem = { ...item };
    newItem.label = `${item.value} $ ${item.label}`;
    if (item.children?.length) {
      const children = dfs(newItem.children);
      newItem.children = children;
    }
    result.push(newItem);
  });
  return result;
};

const result = dfs(data);

console.log('dfs:-> \n', JSON.stringify(result, null, 4));
