export function setEasingFunctions() {
  window.quadIn = (t) => {
    return t * t;
  }
  
  window.quadOut = (t) => {
    return 1 - (1 - t) * (1 - t);
  }
  
  window.quadInOut = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) * 0.5;
  }
  
  window.cubicIn = (t) => {
    return Math.pow(t, 3);
  }
  
  window.cubicOut = (t) => {
    return 1 - Math.pow(1 - t, 3);
  }
  
  window.cubicInOut = (t) => {
    return t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) * 0.5;
  }
  
  window.quartIn = (t) => {
    return Math.pow(t, 4);
  }
  
  window.quartOut = (t) => {
    return 1 - Math.pow(1 - t, 4);
  }
  
  window.quartInOut = (t) => {
    return t < 0.5 ? 8 * Math.pow(t, 4) : 1 - Math.pow(-2 * t + 2, 4) * 0.5;
  }
  
  window.quintIn = (t) => {
    return Math.pow(t, 5);
  }
  
  window.quintOut = (t) => {
    return 1 - Math.pow(1 - t, 5);
  }
  
  window.quintInOut = (t) => {
    return t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) * 0.5;
  }
  
  window.expoIn = (t) => {
    return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
  }
  
  window.expoOut = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
  
  window.expoInOut = (t) => {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5 ? Math.pow(2, 20 * t - 10) * 0.5
      : (2 - Math.pow(2, -20 * t + 10)) * 0.5;
  }

  window.sineIn = (t) => {
    return 1 - Math.cos((t * Math.PI) * 0.5);
  }
  
  window.sineOut = (t) => {
    return Math.sin((t * Math.PI) * 0.5);
  }
  
  window.sineInOut = (t) => {
    return -(Math.cos(Math.PI * t) - 1) * 0.5;
  }

  window.circIn = (t) => {
    return 1 - Math.sqrt(1 - Math.pow(t, 2));
  }

  window.circOut = (t) => {
    return Math.sqrt(1 - Math.pow(t - 1, 2));
  }

  window.circInOut = (t) => {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) * 0.5
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) * 0.5;
  }
}