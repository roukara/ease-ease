import { Tween } from './utils/Tween';
import { setEasingFunctions } from './helpers/setEasingFunctions';
import { GraphCanvas } from './components/GraphCanvas';
import { AnimationCanvas } from './components/AnimationCanvas';
import { DurationInput } from './components/DurationInput';
import { DurationRange } from './components/DurationRange';
import { AnimationButton } from './components/AnimationButton';
import { FunctionInput } from './components/FunctionInput';
import { FunctionClearButton } from './components/FunctionClearButton';
import { OperatorButtons } from './components/OperatorButtons';
import { EasingButtons } from './components/EasingButtons';

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

  const graphCanvas = new GraphCanvas();
  const animationCanvas = new AnimationCanvas();
  const durationRange = new DurationRange();
  const durationInput = new DurationInput({
    min: durationRange.min, max: durationRange.max
  });
  const animationButton = new AnimationButton();
  const functionInput = new FunctionInput();
  const functionClearButton = new FunctionClearButton();
  const operatorButtons = new OperatorButtons();
  const easingButtons = new EasingButtons();

  durationInput.on('input', (value) => {
    durationRange.handleInputText(value);
    state.duration = value;
  });

  durationRange.on('input', (value) => {
    durationInput.handleInputRange(value);
    state.duration = value;
  });

  animationButton.on('click', () => {
    tween.to({
      duration: state.duration
    });
  });

  functionInput.on('input', (func) => {
    tween.ease = func;
  });

  functionClearButton.on('click', () => {
    functionInput.handleClear();
  });

  operatorButtons.on('click', (value) => {
    functionInput.handleClickButton('operator', value);
  });

  easingButtons.on('click', (value) => {
    functionInput.handleClickButton('easing', value);
  });

  window.addEventListener('resize', handleResize);
  requestAnimationFrame(raf);

  function handleResize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    graphCanvas.handleResize(dpr);
    animationCanvas.handleResize(dpr);
  }

  function raf(timestamp) {
    tween.raf(timestamp);
    
    graphCanvas.draw(tween);
    animationCanvas.draw(tween);

    requestAnimationFrame(raf);
  }
}

main();
