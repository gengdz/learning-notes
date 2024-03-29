function TreeNode(value) {
  this.left = null;
  this.right = null;
  this.value = value;
}

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

//1. 层级遍历。 输出: [[3], [9, 20], [15, 7]]

const levelOrderTraversal = (root) => {
  const result = [];
  const queue = [root];

  while (queue.length) {
    const currentLevel = [];
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    console.log('ccc', currentLevel);

    result.push(currentLevel);
  }

  return result;
};

// 前序遍历。
const preorderTraversal = (root) => {
  const result = [];
  const traverse = (node) => {
    if (node === null) return;
    result.push(node.value);
    traverse(node.left);
    traverse(node.right);
  };
  traverse(root);
  return result;
};

// 中序遍历。
const inorderTraversal = (root) => {
  const result = [];
  const traverse = (node) => {
    if (node === null) return;
    traverse(node.left);
    result.push(node.value);
    traverse(node.right);
  };
  traverse(root);
  return result;
};

// 后序遍历。
const postorderTraversal = (root) => {
  const result = [];
  const traverse = (node) => {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.value);
  };
  traverse(root);
  return result;
};

// 最大深度
const maxDepth = (root) => {
  if (root == null) {
    return 0; // 如果当前节点为空，深度为0
  } else {
    // 计算左子树的最大深度
    const leftDepth = maxDepth(root.left);
    // 计算右子树的最大深度
    const rightDepth = maxDepth(root.right);
    // 当前节点的最大深度为左、右子树深度的较大者 + 1
    return Math.max(leftDepth, rightDepth) + 1;
  }
};
