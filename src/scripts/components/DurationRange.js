import { Component } from './core/Component';

export class DurationRange extends Component {
  constructor() {
    super('.duration__range');

    this.min = this.el.min;
    this.max = this.el.max;

    this.activeColor = this.el.dataset.activeColor;
    this.baseColor = this.el.dataset.baseColor;

    this.updateStyle();

    this.el.addEventListener('input', this.handleInput);
  }

  handleInput = (e) => {
    const value = e.target.value;

    this.updateStyle();
    
    this.emit('input', value);
  }

  handleInputText = (value) => {
    this.el.value = value;
  }

  updateStyle = () => {
    const { el, activeColor, baseColor } = this;

    const progress = (el.value / el.max) * 100;
    el.style.background = `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`;
  }
}