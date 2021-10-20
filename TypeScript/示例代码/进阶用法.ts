// infer 的用法 1
type Ids = number[];
type Names = string[];

type Unpacked<T> = T extends (infer R)[] ? R : T;

type idType = Unpacked<Ids>; // idType 类型为 number
type nameType = Unpacked<Names>; // nameType 类型为 string
type t1 = Unpacked<boolean> // t1 类型为 boolean


// infer 的用法 2
function add(a: number, b: number) {
  return a + b;
}
// Parameters<Type>
type MyParameters<T extends (...args: any) => any> = T extends (...args: (infer P)) => any ? P : never

type addPara = MyParameters<typeof add>



// is 的用法
function isStringBaseIs(test: any): test is string {
  return typeof test === 'string'
}

function isStringBaseBoolean(test: unknown): boolean {
  return typeof test === 'string'
}

function example(foo: any) {
  if (isStringBaseIs(foo)) {
    // 下面代码中 foo 会被断言成 string。
    console.log(foo.toUpperCase());
    // 如下代码编译时会出错，运行时也会出错，因为 foo 是 string 不存在toExponential方法
    console.log(foo.toExponential(2));
  }

  if (isStringBaseBoolean(foo)) {
    // 下面的代码中 foo 依然是被断言成 any。没有提示！！！
    console.log(foo.toUpperCase())
  }
  // 编译不会出错，但是运行时出错
  console.log(foo.toExponential(2));
}
example("hello world");



enum FormStateEnum {
  add = "add",
  edit = "edit",
  view = "view"
}

type FormState = keyof typeof FormStateEnum;
