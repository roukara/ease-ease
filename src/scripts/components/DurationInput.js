import { Component } from "./core/Component";
import { MathUtils } from "../utils/MathUtils";

export class DurationInput extends Component {
  constructor({ min, max }) {
    super('.duration__input');
    
    this.min = min;
    this.max = max;

    this.el.addEventListener('input', this.handleInput);
  }

  handleInput = (e) => {
    const value = MathUtils.clamp(e.target.value, this.min, this.max);

    if (isNaN(value)) return;

    this.emit('input', value);
  }

  handleInputRange = (value) => {
    this.el.value = value;
    this.el.placeholder = value;
  }
}