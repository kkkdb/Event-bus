## 发布订阅
**由存储事件，监听者，发布者组成。其中存储事件用了Map，因为键值对的存储方式处理起来比较方便。**

1. 基本构造
> 1. 初始化class  
我们利用ES6的class关键字对Event进行初始化,定义Event的事件清单

```
  class EventEmitter(){
    construcor(){
      this._events = new Map();
    }
  }
```

