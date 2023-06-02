import { Component } from "./core/Component";
import { $ } from "./core/dom";
import { MathUtils } from "../utils/MathUtils";

export class DurationController extends Component {
  constructor() {
    super('.duration');

    this.input = $('.duration__input', this.el);
    this.range = $('.duration__range', this.el);

    this.min = this.range.min;
    this.max = this.range.max;

    this.rangeColor = {
      active: this.range.dataset.activeColor,
      base: this.range.dataset.baseColor
    };

    this.updateRangeStyle();

    this.input.addEventListener('input', this.handleInput);
    this.range.addEventListener('input', this.handleInputRange);
  }

  handleInput = (e) => {
    const value = MathUtils.clamp(e.target.value, this.min, this.max);

    if (isNaN(value)) return;

    this.input.placeholder = value;
    this.range.value = value;

    this.updateRangeStyle();

    this.emit('input', value);
  }

  handleInputRange = (e) => {
    const value = e.target.value;

    this.input.value = value;
    this.input.placeholder = value;

    this.updateRangeStyle();
    
    this.emit('input', value);
  }

  updateRangeStyle = () => {
    const { range, rangeColor } = this;

    const progress = (range.value / range.max) * 100;
    range.style.background = `linear-gradient(to right, ${rangeColor.active} ${progress}%, ${rangeColor.base} ${progress}%)`;
  }
}