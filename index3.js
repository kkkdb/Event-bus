//新增移除事件 由于匿名函数无法移除，所以给函数加上名称

//首先利用class对Event进行初始化，包括事件清单和监听者上限
class EventEmitter {
  constructor(_maxListeners = 10) {
    this._events = new Map(); //储存事件/回调键值对
    this._maxListeners = _maxListeners; //最高监听数
  }
}

//设置监听
EventEmitter.prototype.on = function(type, fn) {
  //将type事件以及对应的回调函数fn放入_events存储里面
  let handler = this._events.get(type);
  if (handler) {
    handler.push(fn);
    this._events.set(type, handler);
  } else {
    this._events.set(type, [fn]);
  }
};

//触发监听
EventEmitter.prototype.emit = function(type, ...args) {
  //从_events存储中获取type事件的回调函数
  let handler = this._events.get(type);
  try {
    handler.forEach(element => {
      element.apply(this, args);
    });
  } catch {
    console.error("没有该方法");
  }
};

//移除监听
EventEmitter.prototype.delete = function(type, fn) {
  //从_events存储中获取type事件的回调函数
  let handler = this._events.get(type);
  try {
    if (handler.length == 1 || fn === undefined) {
      this._events.delete(type);
    } else {
      let index = handler.indexOf(fn);
      if (~index) {
        handler.splice(index, 1);
        this._events.set(type, handler);
      } else {
        console.error("没有找到该方法对应的监听者行为~");
      }
    }
  } catch {
    console.error("没有该方法");
  }
};

var emitter = new EventEmitter();
let jieshao = (age, num) => {
    console.log(`我叫${num},今年${age}`);
  },
  shiai = (age, num) => {
    console.log(`我今年${age},我爱${num}`);
  };
emitter.on("test", jieshao);
emitter.on("test", shiai);
//删除shiai
emitter.delete("test", shiai);
emitter.emit("test", 18, "张三");
