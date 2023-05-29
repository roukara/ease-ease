export function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}