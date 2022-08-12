const strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A(salary) {
    return salary * 3;
  },
  B: salary => salary * 2
};
const calculateBonus = (level, salary) => {
  return strategies[level](salary);
};

console.log(calculateBonus('S', 100)); // 输出：400
console.log(calculateBonus('A', 100)); // 输出：300
console.log(calculateBonus('B', 100)); // 输出：200


