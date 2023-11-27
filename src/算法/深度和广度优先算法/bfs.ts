import { data } from './dfs';

const bfs = (list: typeof data) => {
  const result = [];
  const queue = [...list];

  while (queue.length) {
    const item = queue.shift();
    const newItem = { ...item };
    newItem.label = `${item.value} $ ${item.label}`;
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
