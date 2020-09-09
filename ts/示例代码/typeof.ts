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

