export {};

// 联合类型
type StringOrNumber = string | number;

const consoleLog = console.log;

export { StringOrNumber, consoleLog };

let data: unknown;
data = true; // ok
data = 2222; // ok

const data2: string = data; // error

type Fn = <T extends object, K extends keyof T>(obj: T, key: K) => T[K];
const getObjProp: Fn = (obj, key) => obj[key];

getObjProp({ name: 'xx', age: 10 }, 'ages'); // 类型报错

getObjProp({ name: 'xx' }, 'name'); // 类型不报错

interface IParams {
  name: string;
  age: string;
  c: number[];
}

const stringfy = (obj: IParams): string => {
  return '';
};
