// ES6 方式
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = 'CustomError';
  }
}

const e1 = new CustomError('自定义错误', 'custom');


// ES5 方式
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = Object.create(Error.prototype);
Object.defineProperty(UserError.prototype, 'contructor', {
  value: UserError,
  enumerable: false,
})
