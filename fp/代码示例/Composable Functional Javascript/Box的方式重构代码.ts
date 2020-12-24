const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})
Box.of = x => Box(x);

// 命令式
namespace A1 {
  // 命令式 moneyToFloat
  const moneyToFloat = str =>
    parseFloat(str.replace(/\$/g, ''));

  console.log('命令式', moneyToFloat('$5.00'))

  const percentToFloat = str => {
    const replaced = str.replace(/\%/g, '');
    const number = parseFloat(replaced);
    return number * 0.01;
  };

  console.log('命令式', percentToFloat('20%'))

  const applyDiscount = (price, discount) => {
    const cost = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cost - cost * savings;
  };
  console.log('命令式', applyDiscount('$5.00', '20%'))

}


// Box 式
namespace B1 {
  const moneyToFloat = str =>
    Box(str)
      .map(s => s.replace(/\$/g, ''))
      .map(r => parseFloat(r))

  console.log('Box式', moneyToFloat('$5.00').fold(x => x))

  const percentToFloat = str =>
    Box(str)
      .map(str => str.replace(/\%/g, ''))
      .map(replaced => parseFloat(replaced))
      .map(number => number * 0.01);

  console.log('Box式', percentToFloat('20%').fold(x => x))

  const applyDiscount = (price, discount) =>
    moneyToFloat(price)
      .fold(cost =>
        percentToFloat(discount)
          .fold(discount => cost - cost * discount)
      )
  console.log('Box式', applyDiscount('$5.00', '20%'))

}


