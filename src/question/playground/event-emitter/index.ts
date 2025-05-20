export {};

// const events = {
//   countChange: [ cb1, cb2, cb3],
//   click: [ cb1, cb2, cb3],
// };

class EventEmitter {
  private events: Record<string, Function[]>;
  constructor() {
    this.events = {};
  }
  on(type, listener) {
    this.events[type] = (this.events[type] || []).concat(listener);
  }

  off(type, listener) {
    this.events[type] = this.events[type].filter((cb) => cb !== listener);
  }

  emit(type, ...args) {
    this.events[type].forEach((listener) => listener(...args));
  }

  once(type, listener) {
    const fn = (...args) => {
      listener(...args);
      this.off(type, fn);
    };
    this.on(type, fn);
  }
}

// 使用如下
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");


// const callback2 = (data) => console.log(`${data.name}`);
//
// event.on("click", callback2);
//
// event.emit("click", { name: "xiaoming" });
//
// event.off("click", callback2);
//
// event.emit("click", { name: "lili" });
