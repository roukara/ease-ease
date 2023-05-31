import { Component } from "./core/Component";

export class FunctionInput extends Component {
  constructor() {
    super('.function__input');

    this.el.addEventListener('input', this.handleInput);
  }

  handleInput = (e) => {
    const value = e.target.value;

    const func = this.evaluateFunction(value);
    if (func instanceof Error) return;

    this.el.placeholder = value;

    this.emit('input', func);
  }

  handleClear = () => {
    this.el.value = '';
  }

  handleClickButton = (type, value) => {
    const { el } = this;

    if (type === 'operator' && el.value === '') {
      el.value = el.placeholder;
    }

    const selectPosition = el.selectionStart;
    
    el.value =
      el.value.substring(0, selectPosition) +
      value +
      el.value.substring(selectPosition);

    const func = this.evaluateFunction(el.value);
    if (func instanceof Error) return;

    el.placeholder = el.value;

    this.emit('input', func);
  }

  evaluateFunction = (value) => {
    try {
      if (!/^[\w\s()*+\-\/.%]*t[\w\s()*+\-\/.%]*$/.test(value)) {
        throw new Error('Invalid expression');
      }
    
      const func = new Function('t', `return ${value}`);
    
      if (!(typeof func(Math.random()) === 'number')) {
        throw new Error('Invalid expression');
      }
    
      return func;
    } catch (error) {
      return error;
    }
  }
}