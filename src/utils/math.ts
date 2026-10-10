export function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function interpolate(start: number, end: number, ratio: number): number {
  return start + (end - start) * ratio;
}

export function easeSmoothly(ratio: number): number {
  return ratio * ratio * (3 - 2 * ratio);
}
