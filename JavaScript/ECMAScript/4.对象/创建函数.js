/**
 * 工厂函数的方式
 * @param {string} name 
 * @returns 对象
 */
function stu(name) {
  return {
    name,
    show() {
      console.log(this.name)
    }
  }
};

const s1 = stu('工厂1');
s1.show();
const s2 = stu('工厂2')
s2.show();


{
  /**
 * 构造函数的方式
 * @param {string} name 
 * @returns 对象
 */
  function Student(name) {
    this.name = name;
    this.show = function () {
      console.log(this.name)
    }
  };

  const s1 = new Student('构造函数1');
  s1.show();
  const s2 = new Student('构造函数2')
  s2.show();
}