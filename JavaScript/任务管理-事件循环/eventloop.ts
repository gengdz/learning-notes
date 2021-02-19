namespace first {
  console.log("runtime");
  function hd(num) {
    let count = 0;
    for (let i = 0; i <= num; i++) {
      count += i;
    }
    console.log(count);
    console.log("runtime");
  }
  let num = 3876543211;
  hd(num);
  console.log("houdunren.com"); //需要等待上面执行完才会执行
}

namespace secondHong {
  console.log("runtime");
  let count = 0;
  let num = 987654321;
  function hd() {
    for (let i = 0; i < 100000000; i++) {
      if (num <= 0) break;
      count += num--;
    }
    if (num > 0) {
      console.log(num);
      setTimeout(hd);
    } else {
      console.log(num);
      console.log(count);
    }
  }
  hd();
  console.log("houdunren.com"); //立刻显示出来
}

namespace thirdWei {
  async function hd(num) {
    let res = await Promise.resolve().then(_ => {
      let count = 0;
      for (let i = 0; i < num; i++) {
        count += num--;
      }
      return count;
    });
    console.log(res);
  }
  hd(987654321);
  console.log("后盾人");
}