namespace jsdoc {
  /**
   * 打招呼
   * @param {string} [somebody=John Doe] - Somebody's name.
   * @
   */
  function sayHello(somebody: string = "John Doe") {
    console.log(`hello ${somebody}`)
  }
  sayHello()
}