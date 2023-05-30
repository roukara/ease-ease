export class Dom {
  static query(selector, parent = document) {
    return parent.querySelector(selector);
  }

  static queryAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  }
}