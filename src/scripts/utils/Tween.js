export class Tween {
  constructor({
    duration = 1,
    delay = 0,
    ease = t => t
  }) {
    this.duration = duration;
    this.delay = delay;
    this.ease = ease;
    this.progress = 0;
    this.time = {
      now: 0,
      last: 0
    };
    this.isRunning = false;
  }
  
  to({
    duration = this.duration,
    delay = this.delay,
    ease = this.ease
  } = {}) {
    this.duration = duration;
    this.delay = delay;
    this.ease = ease;

    this.progress = 0;

    this.time.now = 0;
    this.time.last = 0;

    this.isRunning = false;

    setTimeout(() => {
      this.isRunning = true;
    }, this.delay * 1000);
  }

  raf = (timestamp) => {
    if (!this.isRunning) return;

    const { time, duration, ease } = this;

    if (time.last === 0) time.last = timestamp;
    const deltaTime = (timestamp - time.last) * 0.001;
    time.now = Math.min(time.now + deltaTime, duration);
    time.last = timestamp;

    this.progress = ease(time.now / duration);

    if (this.progress === 1) this.isRunning = false;
  }
}