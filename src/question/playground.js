/**
 * 输入 [1,1,2,2,6,7,7] 得到 6，
 * 输入 [1,1,2,2,6,6,7,7,8] 得到 8。
 */
const getAloneNum = (arr) => {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    const midItem = arr[mid];
    const pre = arr[mid - 1];
    const next = arr[mid + 1];
    if (midItem !== pre && midItem !== next) {
      return midItem;
    }
    if (mid % 2 === 0) {
      if (midItem < next) {
        right = mid;
      }
      if (midItem === next) {
        left = mid;
      }
    } else {
      if (midItem < next) {
        left = mid;
      }
      if (midItem === next) {
        right = mid;
      }
    }
  }
};

// 定义链表节点类
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// 示例用法
let a = new ListNode(1);
let b = new ListNode(2);
let c = new ListNode(3);
let d = new ListNode(4);

a.next = b;
b.next = c;
c.next = d;

// 反转链表函数
function reverseList(head) {
  let prev = null;
  let cur = head;

  // 只要当前节点存在，就执行
  while (cur) {
    let nextTemp = cur.next; // 保存当前节点的下一个节点
    cur.next = prev; // 把当前节点的指针指向上一个节点。完成反转
    prev = cur; // 移动前一个指针到当前节点
    cur = nextTemp; // 移动当前指针到下一个节点位置
  }
  // 反转后，新的头是 prev
  return prev;
}

const reversedHead = reverseList(a);

// 反转双链表
function reverseDoublyLinkedList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    // 记录当前节点的下一个节点
    const nextTemp = curr.next;
    curr.before = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}

function concurrentRequests(urls, maxConcurrent) {}

// 根据表达式计算字母数量

// 描述：输入一串字符串，根据字符串求出每个字母的数量并返回结果对象。（数字为 1 时可省略）

// 示例一：输入：A3B2，输出：{“A”: 3, “B”: 2}

// 示例二：输入：A(A(A2B)2)3C2，输出：{“A”: 16, “B”: 6, “C”: 2}

const chartCount = (str = 'A(A(A2B)2)3C2') => {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ')') {
      stack.push(str[i]);
    } else {
      let decodeStr = '';
      let count = '';

      while (stack.length && stack[stack.length - 1] !== '(') {
        decodeStr = stack.pop() + decodeStr;
      }
      stack.pop();
      while (stack.length && !isNaN(stack[stack.length - 1])) {
        count = stack.pop() + count;
      }

      let v = decodeStr.repeat(parseInt(count || 1));
      stack.push();
    }
  }

  return stack.join();
};
chartCount();

// 样例输入：s = "3[a2[c]]"

// 样例输出：accaccacc

const decodeString = (str = '3[a2[c]]') => {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ']') {
      stack.push(str[i]);
    } else {
      let decodeStr = '';
      let count = '';

      while (stack.length && stack[stack.length - 1] !== '[') {
        decodeStr = stack.pop() + decodeStr;
      }
      stack.pop();
      while (stack.length && !isNaN(stack[stack.length - 1])) {
        count = stack.pop() + count;
      }

      stack.push(decodeStr.repeat(parseInt(count || 1)));
    }
  }

  return stack.join();
};
decodeString();

const findCommonPrefix = (strs = ['abcdef', 'abdefw', 'abc']) => {
  let prefix = strs[0];
  for (let i = 0; i < strs.length; i++) {
    let current = strs[i];
    while (!current.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
};

// 查找有序数组中数字最后一次出现的位置
// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：4

const fn1 = (nums, target) => {
  return nums.findLastIndex((value) => value === target);
};

const fn2 = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let index = -1;
  while (right >= left) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      left = mid + 1;
      index = mid;
    }
    if ([nums[mid]] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return index;
};

// 根据 name 获取 searchParams
const getSearchParamsByName = (url, name) => {
  const urlInfo = new URL(url);
  return urlInfo.searchParams.get(name);
};

// 手写 new
function myNew(contructor, ...args) {
  const obj = Object.create(contructor.prototype);
  const res = contructor.apply(obj, args);
  return obj instanceof Object ? res : obj;
}

const obj = {
  name: 'gdz',
  age: 20,
};

const arr = ['a', 'b', 'c'];

for (const o in obj) {
  console.log('oooo for of', o);
}

for (const key in obj) {
  if (Object.hasOwnProperty.call(obj, key)) {
    const element = obj[key];
    console.log('oooo11 for of', element);
  }
}

export {};
