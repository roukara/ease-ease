import { Component } from './core/Component';

export class CopyText extends Component {
  constructor({ defaultFunction, functionNameList }) {
    super('.copy__text');

    this.functionNameList = functionNameList;

    this.el.innerText = this.stringifyFunction(defaultFunction);
  }

  handleInputFunction = (value) => {
    let text = '';
    let depsCount = 0;

    this.functionNameList.forEach(functionName => {
      if (value.includes(functionName.replace('t)', ''))) {
        text += this.stringifyFunction(functionName.replace('(t)', ''));
        depsCount++;
      }
    });

    if (depsCount > 1) {
      text += 'function ease(t) {\n\t' + 'return ' + value + '\n}';
    }

    this.el.innerText = text;
  }

  stringifyFunction(functionName) {
    const functionString = `${window[functionName]}`;
    const functionBody = functionString.substring(
      functionString.indexOf('{') + 1,
      functionString.lastIndexOf('}')
    ).trim();

    return 'function ' + functionName + '(t) {\n\t' + functionBody + '\n}\n\n';
  }

  handleClickCopy = () => {
    navigator.clipboard.writeText(this.el.innerText);
  }
}