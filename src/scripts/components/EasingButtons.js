import { Component } from './core/Component';
import { $$ } from './core/dom';

export class EasingButtons extends Component {
  constructor() {
    super();

    this.els = $$('.easing-button');

    this.functionNameList = [];

    this.els.forEach(el => {
      el.addEventListener('click', this.handleClick);

      this.functionNameList.push(el.textContent.trim());
    });
  }

  handleClick = (e) => {
    const value = e.currentTarget.textContent.trim();
    
    this.emit('click', value);
  }
}