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
  if (!this._events.has(type)) {
    this._events.set(type, fn);
  }
};

//触发监听
EventEmitter.prototype.emit = function(type, ...args) {
  //从_events存储中获取type事件的回调函数
  let handler = this._events.get(type);
  try {
    handler.apply(this, args);
  } catch {
    console.error("没有该方法");
  }
};

var emitter = new EventEmitter();
emitter.on("test", (age, num) => {
  console.log(`我叫${num},今年${age}`);
});
//同一方法再加一个监听者，不行了
emitter.on("test", (age, num) => {
  console.log(`我今年${age},我爱${num}`);
});
emitter.emit("test", 18, "张三");
