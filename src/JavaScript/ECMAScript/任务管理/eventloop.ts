namespace first {
  console.log("runtime");
  function f1(num) {
    let count = 0;
    for (let i = 0; i <= num; i++) {
      count += i;
    }
    console.log(count);
    console.log("runtime");
  }
  let num = 3876543211;
  f1(num);
  console.log("gengdezhou"); //需要等待上面执行完才会执行
}

namespace secondHong {
  console.log("runtime");
  let count = 0;
  let num = 987654321;
  function f2() {
    for (let i = 0; i < 100000000; i++) {
      if (num <= 0) break;
      count += num--;
    }
    if (num > 0) {
      console.log(num);
      setTimeout(f2);
    } else {
      console.log(num);
      console.log(count);
    }
  }
  f2();
  console.log("gengdezhou"); //立刻显示出来
}

namespace thirdWei {
  async function f3(num) {
    let res = await Promise.resolve().then(_ => {
      let count = 0;
      for (let i = 0; i < num; i++) {
        count += num--;
      }
      return count;
    });
    console.log(res);
  }
  f3(987654321);
  console.log("执行结束");
}