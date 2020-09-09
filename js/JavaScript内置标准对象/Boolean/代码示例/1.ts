const boolean1 = Boolean('');
const boolean2 = Boolean(0);
console.log(boolean1, boolean2)

console.log(typeof Boolean);  // function

class People {
  private name: string;
  private age: number;

  public sayHi() {
    return `${this.name} 说 你好 ${this.age}`
  }
}

console.log(typeof People) // function