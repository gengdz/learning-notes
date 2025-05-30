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

const bfs = (list: typeof data) => {
  const result = [];
  const queue = [...list];

  while (queue.length) {
    const item = queue.shift();
    const newItem = {
      ...item,
      label: `${item.value} $ ${item.label}`,
    };
    result.push(newItem);

    if (item.children?.length) {
      item.children.forEach((child) => {
        queue.push(child);
      });
    }
  }

  return result;
};

const result = bfs(data);

console.log('bfs:-> \n', JSON.stringify(result, null, 4));
