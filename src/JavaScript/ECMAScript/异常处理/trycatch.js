try {
  new Promise((resolve, reject) => {
    JSON.parse('');
    resolve();
  })
} catch (error) {
  console.log('try catch 不能捕获 Promise 中的错误')
}

const getJSONAsync = async () => {
  throw new Error('JSON Error async')
}


const getJSON = () => {
  throw new Error('JSON Error')
}


try {
  getJSON();
} catch (error) {
  console.log('try catch 能捕获同步方法中抛出的错误');
}


try {
  getJSONAsync();
} catch (error) {
  console.log('try catch 不能捕获 async 中抛出的错误', error);
}



(async function asyncWithAwait() {
  try {
    await getJSONAsync();
  } catch (error) {
    console.log('try catch 能捕获 await 一个 async 的错误');
  }
})()




const p = new Promise((resolve, reject) => {
  resolve("success");
});

p.then(
  (data) => {
    throw Error("在 then 里面抛出异常");
  },
  (error) =>
    console.log(
      "then 的第 2 个参数 onRejected，不会处理 onfulfilled 抛出的错误",
      error
    )
).catch((error) => {
  console.log("Promise.catch 会处理 Promise.then 中抛出的错误");
});

const p2 = async () => {
  return Promise.reject(Error("Promise.reject Error"));
};
const p3 = async () => {
  throw Error("async 中 throw Error");
};

const p4 = async () => {
  throw Error("async 中 throw Error");
};



try {
  p2();
} catch (error) {
  console.log("try catch 并不能捕获 Promise.reject 错误", error);
}

try {
  p3();
} catch (error) {
  console.log("try catch 并不能捕获 async 函数中的错误", error);
}

