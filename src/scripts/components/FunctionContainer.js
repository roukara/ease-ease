import { Component } from "./core/Component";
import { $, $$ } from "./core/dom";

export class FunctionContainer extends Component {
  constructor(defaultFunction) {
    super('.function');

    this.input = $('.function__input', this.el);
    this.clearButton = $('.function__clear-button', this.el);
    this.operatorButtons = $$('.function__operator-button', this.el);
    this.easingButtons = $$('.function__easing-button', this.el);

    this.input.placeholder = defaultFunction + '(t)';

    this.selectPosition = 0;

    this.easingList = [];

    this.input.addEventListener('input', this.handleInput);
    this.input.addEventListener('click', this.handleClickInput);
    this.clearButton.addEventListener('click', this.handleClear);
    this.operatorButtons.forEach(operatorButton => {
      operatorButton.addEventListener('click', this.handleClickButton);
    });
    this.easingButtons.forEach(easingButton => {
      easingButton.addEventListener('click', this.handleClickButton);
      this.easingList.push(easingButton.textContent.trim());
    });
  }

  handleInput = () => {
    const { input } = this;

    const value = input.value;

    this.selectPosition = input.selectionStart;

    const func = this.evaluateFunction(value);
    if (func instanceof Error) {
      input.classList.add('is-invalid');
      return;
    }

    input.classList.remove('is-invalid');

    input.placeholder = value;

    this.emit('input', { func, inputValue: value });
  }

  handleClickInput = () => {
    this.selectPosition = this.input.selectionStart;
  }

  handleClear = () => {
    this.selectPosition = 0;
    this.input.value = '';
    this.input.classList.remove('is-invalid');
  }

  handleClickButton = (e) => {
    const target = e.currentTarget;
    const value = target.textContent.trim();

    const { input, selectPosition } = this;

    if (target.classList.contains('operator-button') && input.value === '') {
      input.value = input.placeholder;
    }
    
    input.value =
      input.value.substring(0, selectPosition) +
      value +
      input.value.substring(selectPosition);
      
    this.selectPosition += value.length;

    const func = this.evaluateFunction(input.value);
    if (func instanceof Error) {
      input.classList.add('is-invalid');
      return;
    }

    input.classList.remove('is-invalid');

    input.placeholder = input.value;

    this.emit('input', { func, inputValue: input.value });
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