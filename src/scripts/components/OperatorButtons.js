import { Component } from "./core/Component";
import { $$ } from "./core/dom";

export class OperatorButtons extends Component {
  constructor() {
    super();

    this.els = $$('.operator-button');

    this.els.forEach(el => {
      el.addEventListener('click', this.handleClick);
    });
  }

  handleClick = (e) => {
    const value = e.currentTarget.textContent.trim();

    this.emit('click', value);
  }
}