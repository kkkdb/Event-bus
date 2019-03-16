## 发布订阅
**由存储事件，监听者，发布者组成。其中存储事件用了Map，因为键值对的存储方式处理起来比较方便。**

1. 基本构造  

1.1 初始化class  
我们利用ES6的class关键字对Event进行初始化,定义Event的事件清单

```
  class EventEmitter(){
    construcor(){
      this._events = new Map(); //储存事件/回调键值对
    }
  }
```

1.2 添加监听和发布

```
//添加监听
EventEmitter.prototype.on = function(type, fn) {
  //将type事件以及对应的回调函数fn放入_events存储里面
  if (!this._events.has(type)) {
    this._events.set(type, fn);
  }
};

//添加发布
EventEmitter.prototype.emit = function(type, ...args) {
  //从_events存储中获取type事件的回调函数
  let handler = this._events.get(type);
  try {
    handler.apply(this, args);
  } catch {
    console.error("没有该方法");
  }
};

```
  
监听和发布都建立好了，接下来就来实例化验证下。
```
//实例化
var emitter = new EventEmitter();
emitter.on("test", (age, num) => {
  console.log(`我叫${num},今年${age}`);
});
emitter.emit("test", 18, "张三");
//我叫张三,今年18
```

似乎不错,我们实现了基本的触发/监听,但是如果有多个监听者呢?

```
//同一方法再加一个监听者，不行了
emitter.on("test", (age, num) => {
  console.log(`我今年${age},我爱${num}`);
});
emitter.emit("test", 18, "张三");
//我叫张三,今年18
```  

只触发了一个，我们需要改造。






