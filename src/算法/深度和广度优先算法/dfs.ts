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
  const result = [];
  list.forEach((item) => {
    const newItem = {
      ...item,
      label: `${item.label}(${item.value})`,
    };
    result.push(newItem);

    if (item.children?.length) {
      const children = dfs(newItem.children);
      newItem.children = children;
    }
  });
  return result;
};

const result = dfs(data);

console.log('dfs:-> \n', JSON.stringify(result, null, 4));
