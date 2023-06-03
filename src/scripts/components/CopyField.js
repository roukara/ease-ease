import { Component } from "./core/Component";
import { $ } from "./core/dom";

export class CopyField extends Component {
  constructor({ defaultFunction, easingList }) {
    super('.copy');

    this.easingList = easingList;

    this.text = $('.copy__text', this.el);
    this.button = $('.copy__button', this.el);
    this.tooltip = $('.copy__tooltip', this.el);

    this.text.innerText = this.stringifyFunction(defaultFunction);

    this.el.addEventListener('mousemove', this.handleEnter);
    this.el.addEventListener('mouseleave', this.handleLeave);
    this.button.addEventListener('click', this.handleCopy);
  }

  handleInput = (value) => {
    let text = '';

    this.easingList.forEach(easing => {
      if (value.includes(easing.replace('t)', ''))) {
        text += this.stringifyFunction(easing.replace('(t)', ''));
      }
    });

    text += 'function ease(t) {\n\t' + 'return ' + value + '\n}';

    this.text.innerText = text;
  }

  handleCopy = () => {
    navigator.clipboard.writeText(this.text.innerText).then(() => {
      this.tooltip.textContent = 'copied';
    });
  }

  handleEnter = () => {
    this.tooltip.classList.add('is-show');
  }
  
  handleLeave = () => {
    this.tooltip.textContent = 'copy';
    this.tooltip.classList.remove('is-show');
  }

  stringifyFunction(functionName) {
    const functionString = `${window[functionName]}`;
    const functionBody = functionString.substring(
      functionString.indexOf('{') + 1,
      functionString.lastIndexOf('}')
    ).trim();

    return 'function ' + functionName + '(t) {\n\t' + functionBody + '\n}\n\n';
  }
}