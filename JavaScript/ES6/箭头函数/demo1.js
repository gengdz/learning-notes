
var x = 11;
var obj = {
  x: 22,
  say: function () {
    console.log(this.x)
  },
  arrow: () => {
    console.log(this.x);
  }
}
obj.say(); // 22
obj.arrow(); // 22

