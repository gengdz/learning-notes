interface Person {
  name: string;
  age: number
}

const person: Person = {
  name: 'aa',
  age: 2,
}

type Student = typeof person

console.log(typeof person); // object

const xiaoming: Student = {
  name: '小明',
  age: 18
}


let data: unknown;
data = 2;
data = false;

const consoleData = (data: unknown): void => {
  if (typeof data === "boolean") {
    console.log(`data 是一个 boolean 类型`)
  }
}

consoleData(data);

let data2: boolean = data as boolean;

console.log(data2)

interface Person {
  name: string
  age: number
}

type x = Person['name'] // x is string


