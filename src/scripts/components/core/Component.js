import { $ } from './dom';

export class Component {
  constructor(selector) {
    if (selector) this.el = $(selector);
    
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