// 联合类型
type StringOrNumber = string | number;

const consoleLog = console.log;

export { StringOrNumber, consoleLog };

let data: unknown;
data = true; // ok
data = 2222  // ok

let data2: string = data // error
