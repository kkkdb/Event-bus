## 发布订阅
**由存储事件，监听者，发布者组成。其中存储事件用了Map，因为键值对的存储方式处理起来比较方便。**

1. 初始化class  
首先用class关键词初始化Event，并定义存储事件

```
  class EventEmitter(){
    construcor(){
      this._events = new Map()
    }
  }
```

