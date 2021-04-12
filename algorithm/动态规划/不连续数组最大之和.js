function dpOption(arr) {
  const length = arr.length;
  const opt = new Array(length).fill(0);
  opt[0] = arr[0];
  opt[1] = Math.max(opt[0], arr[1]);
  for (let i = 2; i < length; i++) {
    const selected = arr[i] + opt[i - 2];
    const notSelected = opt[i - 1];
    opt[i] = Math.max(selected, notSelected)
  }
  return opt[length - 1];
};

const data = [1, 2, 4, 1, 7, 8, 3];

console.log(dpOption(data));