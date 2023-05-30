import { Dom } from "../utils/Dom";
import { strokeLine } from "./strokeLine";

export class GraphCanvas {
  constructor() {
    this.el = Dom.query('.graph-canvas');

    const dpr = Math.min(window.devicePixelRatio, 2);

    this.el.width = this.el.clientWidth * dpr;
    this.el.height = this.el.clientHeight * dpr;
    this.size = Math.min(this.el.width, this.el.height);

    this.ctx = this.el.getContext('2d');

    this.margin = 50;

    this.strokePosition = {
      x: 0,
      y: 0
    };
  }

  draw = (tween) => {
    const { el, ctx, size, margin, strokePosition } = this;

    ctx.fillStyle = '#2e2e2e';
    ctx.fillRect(0, 0, el.width, el.height);

    const graphSize = size - margin * 2;

    ctx.save();
    ctx.translate(margin, margin);

    // easing line
    ctx.strokeStyle = '#fff';
    strokePosition.x = 0;
    strokePosition.y = 0;

    for (let x = 0; x < graphSize; x++) {
      const p = x / graphSize;
      const y = tween.ease(p) * graphSize;

      strokeLine(
        ctx,
        strokePosition.x,
        graphSize - strokePosition.y,
        x,
        graphSize - y
      );

      strokePosition.x = x;
      strokePosition.y = y;
    }

    // number
    for (let i = 0; i <= 1; i += 0.25) {
      const x = i * graphSize;
      const y = graphSize - tween.ease(i) * graphSize;
      
      ctx.fillStyle = '#fff';

      ctx.textAlign = 'center';
      ctx.fillText(i, x, graphSize + 20);

      ctx.textAlign = 'right';
      ctx.fillText(Math.round(tween.ease(i) * 100) * 0.01, -10, y);

      ctx.strokeStyle = '#666';
      strokeLine(ctx, 0, y, x, y);
      strokeLine(ctx, x, y, x, graphSize);
    }

    const px = graphSize * tween.progress;
    const py = graphSize - graphSize * tween.ease(tween.progress);

    // horizontal progress line
    ctx.strokeStyle = '#fff';
    strokeLine(ctx, 0, py, px, py);

    // vertical progress line
    strokeLine(ctx, px, py, px, graphSize);

    ctx.restore();
  }

  resize = (dpr) => {
    this.el.width = this.el.clientWidth * dpr;
    this.el.height = this.el.clientHeight * dpr;
    this.size = Math.min(this.el.width, this.el.height);
  }
}