import { fillArc } from '../helpers/fillArc';
import { strokeLine } from '../helpers/strokeLine';
import { $ } from './core/dom';

export class AnimationCanvas {
  constructor() {
    this.el = $('.animation-canvas');

    const dpr = Math.min(window.devicePixelRatio, 2);

    this.el.width = this.el.clientWidth * dpr;
    this.el.height = this.el.clientHeight * dpr;

    this.ctx = this.el.getContext('2d');

    this.arcRadius = this.el.width * 0.1;

    this.margin = 50;
  }

  draw = (tween) => {
    const { el, ctx, arcRadius, margin } = this;

    ctx.fillStyle = '#2e2e2e';
    ctx.fillRect(0, 0, el.width, el.height);

    const cx = el.width * 0.5;
    const ty = el.height - margin;
    const py = ty - (ty - margin) * tween.progress;

    // guide line
    ctx.strokeStyle = '#666';
    strokeLine(ctx, cx, ty, cx, margin);

    // progress line
    ctx.strokeStyle = '#fff';
    strokeLine(ctx, cx, ty, cx, py);

    // arc
    ctx.fillStyle = '#fff';
    fillArc(ctx, cx, py, arcRadius);
  }

  handleResize = (dpr) => {
    const { el } = this;

    el.width = el.clientWidth * dpr;
    el.height = el.clientHeight * dpr;
    this.arcRadius = el.width * 0.15;
  }
}