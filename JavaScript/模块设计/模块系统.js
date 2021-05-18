// 模块列表容器
const myModule = (function () {
  const moduleList = {};
  function define(name, modules, action) {
    modules.forEach((module, i) => {
      modules[i] = moduleList[module];
    });
    moduleList[name] = action.apply(null, modules);

  }
  return {
    define
  }
})()

// 定义一个模块
myModule.define('G', [], () => {
  return {
    max(arr, key) {
      return arr.sort((a, b) => b[key] - a[key])[0]
    }
  }
})

// 使用一个模块
myModule.define('lesson', ['G'], (G) => {
  const lesson = [{ name: 'js', price: 100 }, { name: 'react', price: '200' }];
  const max = G.max(lesson, 'price');
  console.log(max)

});