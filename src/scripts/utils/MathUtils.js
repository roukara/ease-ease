export class MathUtils {
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}