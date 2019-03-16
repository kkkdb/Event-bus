## 发布订阅
**由存储事件，监听者，发布者组成。其中存储事件用了Map，因为键值对的存储方式处理起来比较方便。**

###1.基本构造(index1.js)
####1.1初始化class  
我们利用ES6的class关键字对Event进行初始化,定义Event的事件清单

```
  class EventEmitter(){
    construcor(){
      this._events = new Map(); //储存事件/回调键值对
    }
  }
```
####1.2添加监听和发布

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
emitter.emit("test", 18, "张三");  //我叫张三,今年18
```

似乎不错,我们实现了基本的触发/监听,但是如果有多个监听者呢?

```
//同一方法再加一个监听者，不行了
emitter.on("test", (age, num) => {
  console.log(`我今年${age},我爱${num}`);
});
emitter.emit("test", 18, "张三");  //我叫张三,今年18
```  

只触发了一个，我们需要改造。

###2.升级改造(index2.js)
####2.1监听发布升级  
```
//针对同一事件对个监听者进行优化
//设置监听
EventEmitter.prototype.on = function(type, fn) {
  //将type事件以及对应的回调函数fn放入_events存储里面
  let handler = this._events.get(type);
  if (handler) {
    handler.push(fn);  //将对应事件回调函数放进数组中
    this._events.set(type, handler);
  } else {
    this._events.set(type, [fn]);  //将对应事件回调函数放进数组中
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
```  

这下可以实现多个监听者的功能了。
```
var emitter = new EventEmitter();
emitter.on("test", (age, num) => {
  console.log(`我叫${num},今年${age}`);
});
emitter.on("test", (age, num) => {
  console.log(`我今年${age},我爱${num}`);
});
emitter.emit("test", 18, "张三");  
//我叫张三,今年18
//我今年18,我爱张三
```

###2.2移除监听  
添加delete移除监听函数的方法，但是匿名函数无法被移除。
```
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
emitter.emit("test", 18, "张三");  ////我叫张三,今年18
```  

###3.发现问题  
我们已经基本完成了Event最重要的几个方法,也完成了升级改造。当然还有很多的不足，对传参的判断，监听事件后触发newListener等。但这在面试中现场写一个Event已经是很够意思了,主要是体现出来对发布-订阅模式的理解,以及针对多个监听状况下的处理。  
索性[Event](https://github.com/Gozala/events/blob/master/events.js)库帮我们实现了完整的特性,整个代码量有300多行,很适合阅读,你可以花十分钟的时间通读一下,见识一下完整的Event实现.




