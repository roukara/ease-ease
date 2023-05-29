export function getElementAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}