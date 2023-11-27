namespace overload {
  // 不能使用如下方式 这种方式相当与使用常量，常量不能重复定义
  // const sum = (a: number, b: number): number;
  // const sum = (a: string, b: string): string;
  // const sum = (a: unknown, b: unknown): unknown => {
  // }

  function add(a: number, b: string): number;
  function add(a: string, b: number): string;
  function add(a: unknown, b: unknown): unknown {
    if (typeof a === 'number' && typeof b === 'string') {
      const result = a + b;
      console.log(`number a 与 string b 相加，结果是：${result}`);
      return `数字相加，结果是：${result}`
    }
    if (typeof a === 'string' && typeof b === 'number') {
      const result = a + b;
      console.log(`string a 与 number b 相加，结果是：${result}`);
      return `字符串相加，结果是：${result}`
    }
  }

  add(1, '2');
  add('你好', 22);

}