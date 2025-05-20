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

// 收集所有的 label
function bfsCollectLabel(list: typeof data) {
  const labels = [];
  const queue = [...list];

  while (queue.length) {
    const item = queue.shift();
    labels.push(`${item.label}(${item.value})`);

    if (item.children?.length) {
      item.children.forEach((item) => queue.push(item));
    }
  }

  return labels;
}

console.log('广广广广度遍历收集所有的标签值--->', bfsCollectLabel(data));
