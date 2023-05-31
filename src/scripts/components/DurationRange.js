import { Component } from "./core/Component";

export class DurationRange extends Component {
  constructor() {
    super('.duration__range');

    this.min = this.el.min;
    this.max = this.el.max;

    this.el.addEventListener('input', this.handleInput);
  }

  handleInput = (e) => {
    const value = e.target.value;
    this.emit('input', value);
  }

  handleInputText = (value) => {
    this.el.value = value;
  }
}