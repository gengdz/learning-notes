const user = {
  data: [1, 2, 3, 45, 5]
};

Object.setPrototypeOf(user, {
  max() {
    return Math.max(...this.data)
    // return Math.max.apply(this, this.data)
  }
})

console.log(user.max());

const ls = {
  lessons: { js: 80, css: 60, html: 87 },
  get data() {
    return Object.values(this.lessons)
  }
}

console.log(user.max.apply(ls))

