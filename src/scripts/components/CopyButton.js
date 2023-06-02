import { Component } from "./core/Component";

export class CopyButton extends Component {
  constructor() {
    super('.copy__button');

    this.el.addEventListener('click', this.handleClick);
  }

  handleClick = () => {
    this.emit('click');
  }
}