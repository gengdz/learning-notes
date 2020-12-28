const Right = x => ({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})
Right.of = x => Right(x);

const Left = x => ({
  map: f => Left(x),
  chain: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x => (x != null || x != undefined) ? Right(x) : Left(x)

// 下面实现一个 try catch
const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}


// 下面是一些测试用例

const findColor = name => {
  const found = { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name];
  return found ? Right(found) : Left(null);
};

const result = findColor('green')
  .map(c => c.slice(1))
  .fold(e => 'no color', c => c.toUpperCase());
console.log(result); // "no color"


// fs模块模拟
const fs = {
  readFileSync: file => { }
}
// 获取 port
const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(
      e => 3000,
      c => c.port
    );


// 命令式代码
const streetName = user => {
  const address = user.address;
  if (address) {
    const street = address.street;
    if (street) {
      return street.name;
    }
  }
  return 'no street';
};

const streetNameFp = user =>
  fromNullable(user.address)
    .chain(address => fromNullable(address.street))
    .chain(s => fromNullable(s.name))
    .fold(() => 'no street', name => name)


const user = {
  address: {
    street: {
      name1: '道路名称'
    }
  }
}
const street = streetNameFp(user);
console.log('stree', street)
