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
function dfsCollectLabel(list: typeof data) {
  const labels = [];
  list.forEach((item) => {
    labels.push(`${item.label}(${item.value})`);

    if (item.children?.length) {
      const result = dfsCollectLabel(item.children);
      labels.push(...result);
    }
  });

  return labels;
}

console.log('深深深深度遍历收集所有的标签值--->', dfsCollectLabel(data));
