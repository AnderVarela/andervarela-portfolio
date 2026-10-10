import { clamp, easeSmoothly, interpolate } from './math';

describe('math', () => {
  it('clamps a value between 0 and 1 by default', () => {
    expect(clamp(-0.5)).toBe(0);
    expect(clamp(0.4)).toBe(0.4);
    expect(clamp(3)).toBe(1);
  });

  it('clamps a value between custom bounds', () => {
    expect(clamp(-4, -1, 1)).toBe(-1);
  });

  it('interpolates linearly between two values', () => {
    expect(interpolate(10, 20, 0.25)).toBe(12.5);
  });

  it('eases smoothly keeping both ends and the midpoint', () => {
    expect(easeSmoothly(0)).toBe(0);
    expect(easeSmoothly(0.5)).toBe(0.5);
    expect(easeSmoothly(1)).toBe(1);
  });
});
