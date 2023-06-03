import { Tween } from './utils/Tween';
import { defineEasingFunctions } from './helpers/defineEasingFunctions';
import { GraphCanvas } from './components/GraphCanvas';
import { AnimationCanvas } from './components/AnimationCanvas';
import { AnimationButton } from './components/AnimationButton';
import { DurationController } from './components/DurationController';
import { FunctionContainer } from './components/FunctionContainer';
import { CopyField } from './components/CopyField';

function main() {
  defineEasingFunctions();
  
  const state = {
    duration: 2.0,
    delay: 0.2,
    default: 'quadIn'
  };

  const tween = new Tween({
    duration: state.duration,
    delay: state.delay,
    ease: window[state.default]
  });

  const graphCanvas = new GraphCanvas();
  const animationCanvas = new AnimationCanvas();
  const durationController = new DurationController();
  const animationButton = new AnimationButton();
  const functionContainer = new FunctionContainer(state.default);
  const copyField = new CopyField({
    defaultFunction: state.default,
    easingList: functionContainer.easingList
  });

  durationController.on('input', (value) => {
    state.duration = value;
  });

  animationButton.on('click', () => {
    tween.to({
      duration: state.duration
    });
  });

  functionContainer.on('input', ({ func, inputValue }) => {
    tween.ease = func;
    copyField.handleInput(inputValue);
  });

  handleResize();

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
