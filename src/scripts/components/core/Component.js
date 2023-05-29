import { getElement } from "./getElement";

export class Component {
  constructor(el) {
    this.el = getElement(el);
    
    this._callbacks = new Map();
  }

  on = (eventName, callback) => {
    this._callbacks.set(eventName, callback);
  }

  emit = (eventName, ...args) => {
    if (!this._callbacks.has(eventName)) return;

    const callback = this._callbacks.get(eventName);

    callback(...args);
  }

  off = (eventName) => {
    this._callbacks.delete(eventName);
  }
}