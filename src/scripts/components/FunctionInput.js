import { Component } from './core/Component';

export class FunctionInput extends Component {
  constructor(defaultFunction) {
    super('.function__input');

    this.el.placeholder = `${defaultFunction}(t)`;

    this.selectPosition = 0;

    this.el.addEventListener('input', this.handleInput);
    this.el.addEventListener('click', this.handleClick);
  }

  handleInput = () => {
    const value = this.el.value;

    this.selectPosition = this.el.selectionStart;

    const func = this.evaluateFunction(value);
    if (func instanceof Error) {
      this.el.classList.add('is-invalid');
      return;
    }

    this.el.classList.remove('is-invalid');

    this.el.placeholder = value;

    this.emit('input', { func, inputValue: value });
  }

  handleClick = () => {
    this.selectPosition = this.el.selectionStart;
  }

  handleClear = () => {
    this.el.value = '';
    this.selectPosition = 0;
    this.el.classList.remove('is-invalid');
  }

  handleClickButton = (type, value) => {
    const { el, selectPosition } = this;

    if (type === 'operator' && el.value === '') {
      el.value = el.placeholder;
    }
    
    el.value =
      el.value.substring(0, selectPosition) +
      value +
      el.value.substring(selectPosition);
      
    this.selectPosition += value.length;

    const func = this.evaluateFunction(el.value);
    if (func instanceof Error) {
      this.el.classList.add('is-invalid');
      return;
    }

    this.el.classList.remove('is-invalid');

    el.placeholder = el.value;

    this.emit('input', { func, inputValue: el.value });
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