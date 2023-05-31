import { Component } from "./core/Component";

export class AnimationButton extends Component {
  constructor() {
    super('.animation__button');

    this.el.addEventListener('click', this.handleClick);
  }

  handleClick = () => {
    this.emit('click');
  }
}