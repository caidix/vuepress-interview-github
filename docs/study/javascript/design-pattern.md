---
title: 设计模式应用
date: 2020-01-03
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

## 发布订阅模式

```ts
export enum EventName {
  HandleEvent = "HandleEvent",
}

export interface EventCallbackMap {
  [EventName.HandleEvent]: [];
}

export class EventEmitter<T extends EventName = any> {
  eventsStore: Map<any, any>;

  constructor() {
    this.eventsStore = new Map(); // 储存{事件：回调}键值对
  }

  emit(type: T, ...args: EventCallbackMap[T]) {
    console.log("emit ", type);
    //从存储的Map键值对this._events中获取对应事件回调函数
    const handler = this.eventsStore.get(type);
    if (!handler) {
      return false;
    }
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        if (args.length > 0) {
          handler[i].apply(this, args);
        } else {
          handler[i].call(this);
        }
      }
    } else {
      if (args.length > 0) {
        handler.apply(this, args);
      } else {
        handler.call(this);
      }
    }

    return true;
  }

  on(type: T, fn: (...args: EventCallbackMap[T]) => void) {
    console.log("on ", type);

    const handler = this.eventsStore.get(type);

    if (!handler) {
      this.eventsStore.set(type, fn);
    } else if (handler && typeof handler === "function") {
      //hanlder为函数，说明只有一个监听者
      //多个监听者用数组存储
      this.eventsStore.set(type, [handler, fn]);
    } else {
      //已有多个监听者，直接Push进数组
      handler.push(fn);
    }
  }

  delete(type: T, fn: (...args: EventCallbackMap[T]) => void) {
    const handler = this.eventsStore.get(type);
    // 如果是函数,说明只被监听了一次
    if (handler && typeof handler === "function") {
      this.eventsStore.delete(type);
    } else {
      let postion;
      for (let i = 0; i < handler.length; i++) {
        if (handler[i] === fn) {
          postion = i;
        } else {
          postion = -1;
        }
      }
      if (postion !== -1) {
        handler.splice(postion, 1);
        if (handler.length === 1) {
          this.eventsStore.set(type, handler[0]);
        }
      } else {
        return this;
      }
    }
  }
}
```

## 配合发布订阅模式的商品抢购计时器

```js
enum CountdownStatus {
    opening,
    stoped,
    paused
}

interface CountdownOptions {
    showTwoMillSecond?: boolean;
}

export class Countdown extends EventEmitter {
    private static COUNT_IN_MILLISECOND: number = 1 * 100;
    private static SECOND_IN_MILLISECOND: number =
        10 * Countdown.COUNT_IN_MILLISECOND;
    private static MINUTE_IN_MILLISECOND: number =
        60 * Countdown.SECOND_IN_MILLISECOND;
    private static HOUR_IN_MILLISECOND: number =
        60 * Countdown.MINUTE_IN_MILLISECOND;
    private static DAY_IN_MILLISECOND: number =
        24 * Countdown.HOUR_IN_MILLISECOND;

    private endTime: number;
    private step: number;
    private options: CountdownOptions;
    private remainTime: number = 0;
    private status: CountdownStatus = CountdownStatus.stoped;
    constructor(
        endTime: number,
        step: number = 1e3, // 程序中"1e3" = 1 x 10 ^ 3
        options: CountdownOptions = {}
    ) {
        super();
        this.endTime = endTime;
        this.step = step;
        this.options = options;
    }
    countdown() {
        if (this.status !== CountdownStatus.opening) return;
        // 相差时间值 如果给到的时间本身就小于当前时间，则等于0后不执行
        this.remainTime = Math.max(this.endTime - Date.now(), 0);

        // 每一次执行计时器发生计时触发发布订阅模式中用户添加的方法，返回时间参数
        this.emit("countdown", this.parseRemainTime(this.remainTime));

        if (this.remainTime > 0) {
            setTimeout(() => this.countdown(), this.step);
        } else {
            this.stop();
        }
    }
    stop() {
        this.emit("stop");
        this.status = CountdownStatus.stoped;
    }
    opening() {
        this.emit("opening");
        this.status = CountdownStatus.opening;
    }
    pause() {
        this.emit("pause");
        this.status = CountdownStatus.paused;
    }

    private parseRemainTime(remainTime: number) {
        let time = remainTime;

        const days = Math.floor(time / Countdown.DAY_IN_MILLISECOND);
        time = time % Countdown.DAY_IN_MILLISECOND;

        const hours = Math.floor(time / Countdown.HOUR_IN_MILLISECOND);
        time = time % Countdown.HOUR_IN_MILLISECOND;

        const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLISECOND);
        time = time % Countdown.MINUTE_IN_MILLISECOND;

        const seconds = Math.floor(time / Countdown.SECOND_IN_MILLISECOND);
        time = time % Countdown.SECOND_IN_MILLISECOND;

        let count = time;
        if (!this.options.showTwoMillSecond) {
            count = Math.floor(time / Countdown.COUNT_IN_MILLISECOND);
        }

        return {
            days,
            hours,
            minutes,
            seconds,
            count
        };
    }
}

```
