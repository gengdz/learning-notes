export {};

// 定义链表节点类
class LinkedNode {
  public val;
  public next;
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// 示例用法
const a = new LinkedNode(1);
const b = new LinkedNode(2);
const c = new LinkedNode(3);
const d = new LinkedNode(4);

a.next = b;
b.next = c;
c.next = d;

// 反转链表函数
function reverseList(head: LinkedNode) {
  let prev = null;
  let cur = head;
  while (cur) {
    const temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  return prev;
}

// 执行过程
// 1. 初始状态
// prev = null
// cur = 1 -> 2 -> 3 -> 4 -> null
// 2. 处理第一个节点
// prev =  1 -> null
// cur 2 -> 3 -> 4 -> null

// 交换的时候，注意下
// 当前节点.next = xxx
// 前面的节点 = 当前节点
// 当前节点 = 后端一个节点。k

// 原 1 -> 2 -> 3 -> 4 -> null
// 现 4 -> 3 -> 2 -> 1 -> null
const result = reverseList(a);
console.log('rrrreverseList-->', result);
