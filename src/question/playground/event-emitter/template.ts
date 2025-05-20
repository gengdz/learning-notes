export {};

// const events = {
//   countChange: [ cb1, cb2, cb3],
//   click: [ cb1, cb2, cb3],
// };

class EventEmitter {
  on(type, listener) {}

  off(type, listener) {}

  emit(type, ...args) {}

  once(type, listener) {}
}

// 使用如下
// const event = new EventEmitter();

// const handle = (...rest) => {
//   console.log(rest);
// };

// event.on("click", handle);

// event.emit("click", 1, 2, 3, 4);

// event.off("click", handle);

// event.emit("click", 1, 2);

// event.once("dbClick", () => {
//   console.log(123456);
// });
// event.emit("dbClick");
// event.emit("dbClick");
