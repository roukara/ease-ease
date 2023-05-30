import { Dom } from "./utils/Dom";
import { MathUtils } from "./utils/MathUtils";
import { Tween } from "./utils/Tween";
import { evaluateFunction } from "./helpers/evaluateFunction";
import { setEasingFunctions } from "./helpers/setEasingFunctions";
import { GraphCanvas } from "./canvas/GraphCanvas";
import { AnimationCanvas } from "./canvas/AnimationCanvas";

function main() {
  setEasingFunctions();
  
  const state = {
    duration: 2.0,
    delay: 0.2
  };

  const tween = new Tween({
    duration: state.duration,
    delay: state.delay,
    ease: window['quadOut']
  });

  // init canvases
  const graphCanvas = new GraphCanvas();
  const animationCavnas = new AnimationCanvas();

  // get elements
  const durationInput = Dom.query('.duration__input');
  const durationRange = Dom.query('.duration__range');
  const animationButton = Dom.query('.animation__button');
  const copyText = Dom.query('.copy__text');
  const copyButton = Dom.query('.copy__button');
  const functionInput = Dom.query('.function__input');
  const functionClearButton = Dom.query('.function__clear-button');
  const operatorButtons = Dom.queryAll('.operator-button');
  const easingButtons = Dom.queryAll('.easing-button');

  // add events
  durationInput.addEventListener('input', onDurationInput);
  durationRange.addEventListener('input', onDurationRangeInput);
  animationButton.addEventListener('click', onAnimationButtonClick);
  copyButton.addEventListener('click', onCopyButtonClick);
  functionInput.addEventListener('input', onFunctionInput);
  functionClearButton.addEventListener('click', onFunctionClearButtonClick);
  operatorButtons.forEach(button => {
    button.addEventListener('click', onOperatorButtonClick);
  })
  easingButtons.forEach(button => {
    button.addEventListener('click', onEasingButtonClick);
  });
  window.addEventListener('resize', onResize);
  requestAnimationFrame(raf);

  // define event handlers
  function onDurationInput(e) {
    const value = MathUtils.clamp(e.target.value, 0.1, 10);
    if (isNaN(value)) return;
    durationRange.value = value;
  }

  function onDurationRangeInput(e) {
    const value = e.target.value;
    durationInput.value = value;
    durationInput.placeholder = value;
    state.duration = value;
  }

  function onAnimationButtonClick() {
    tween.to({
      duration: state.duration
    });
  }

  function onCopyButtonClick() {

  }

  function onFunctionInput(e) {
    const value = e.target.value;

    const func = evaluateFunction(value);
    if (func instanceof Error) return;

    functionInput.placeholder = value;
    copyText.innerText += value + '\n\n';

    tween.ease = func;
  }

  function onFunctionClearButtonClick() {
    functionInput.value = '';
  }

  function onOperatorButtonClick(e) {
    const text = e.currentTarget.textContent.trim();

    if (functionInput.value === '') {
      functionInput.value = functionInput.placeholder;
    }

    const selectPosition = functionInput.selectionStart;
    
    functionInput.value =
      functionInput.value.substring(0, selectPosition) +
      text +
      functionInput.value.substring(selectPosition);
    
    const value = functionInput.value;

    const func = evaluateFunction(value);
    if (func instanceof Error) return;

    functionInput.placeholder = value;

    tween.ease = func;
  }

  function onEasingButtonClick(e) {
    const text = e.currentTarget.textContent.trim();

    const selectPosition = functionInput.selectionStart;
    
    functionInput.value =
      functionInput.value.substring(0, selectPosition) +
      text +
      functionInput.value.substring(selectPosition);

    const value = functionInput.value;

    const func = evaluateFunction(value);
    if (func instanceof Error) return;

    functionInput.placeholder = value;

    tween.ease = func;
  }

  function onResize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    graphCanvas.resize(dpr);
    animationCavnas.resize(dpr);
  }

  function raf(timestamp) {
    tween.raf(timestamp);
    
    graphCanvas.draw(tween);
    animationCavnas.draw(tween);

    requestAnimationFrame(raf);
  }
}

main();
