import { computeHorizontalGestureScroll, computeTrackOverflow } from './ProjectsSection.helper';

describe('computeTrackOverflow', () => {
  it('leaves the last card at the right margin, as wide as the left one', () => {
    const windowWidth = 1000;
    const padding = 56;
    const trackWidth = 2000;
    const overflow = computeTrackOverflow(trackWidth, windowWidth, padding * 2);
    const lastCardRightEdge = padding + trackWidth - overflow;

    expect(windowWidth - lastCardRightEdge).toBe(padding);
  });

  it('does not move a track that already fits', () => {
    expect(computeTrackOverflow(600, 1000, 112)).toBe(0);
  });
});

describe('computeHorizontalGestureScroll', () => {
  const range = { start: 1000, end: 3000 };

  it('moves the page as much as the track needs to follow the gesture', () => {
    // 2000 px de scroll recorren 1000 px de pista: cada píxel del gesto son 2 de scroll.
    expect(computeHorizontalGestureScroll(1500, 100, 1000, range)).toBe(1700);
    expect(computeHorizontalGestureScroll(1500, -100, 1000, range)).toBe(1300);
  });

  it('never takes the page out of the pinned stretch', () => {
    expect(computeHorizontalGestureScroll(2950, 200, 1000, range)).toBe(3000);
    expect(computeHorizontalGestureScroll(1050, -200, 1000, range)).toBe(1000);
  });
});
