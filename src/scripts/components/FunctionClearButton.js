import { Component } from "./core/Component";

export class FunctionClearButton extends Component {
  constructor() {
    super('.function__clear-button');

    this.el.addEventListener('click', this.handleClick);
  }

  handleClick = () => {
    this.emit('click');
  }
}