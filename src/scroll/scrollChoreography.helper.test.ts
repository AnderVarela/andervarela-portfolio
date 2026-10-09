import {
  computeAvatarTimeline,
  computeBackgroundTint,
  computeDocumentProgress,
  computeSectionMotion,
  findActiveSectionIndex,
  type SectionBounds,
} from './scrollChoreography.helper';

const VIEWPORT_HEIGHT = 1000;

const SECTIONS: SectionBounds[] = [
  { top: 0, height: 1000 },
  { top: 1000, height: 1000 },
  { top: 2000, height: 3000 },
];

describe('computeSectionMotion', () => {
  it('reports a section below the viewport as not entered', () => {
    expect(computeSectionMotion(1000, 1000, VIEWPORT_HEIGHT).enterProgress).toBe(0);
  });

  it('reports a section filling the viewport as entered and not exited', () => {
    const motion = computeSectionMotion(0, 1000, VIEWPORT_HEIGHT);

    expect(motion.enterProgress).toBe(1);
    expect(motion.exitProgress).toBe(0);
  });

  it('reports a section scrolled above the viewport as exited', () => {
    expect(computeSectionMotion(-1000, 1000, VIEWPORT_HEIGHT).exitProgress).toBe(1);
  });

  it('tracks the progress through a pinned section', () => {
    expect(computeSectionMotion(-1000, 3000, VIEWPORT_HEIGHT).pinnedProgress).toBe(0.5);
  });
});

describe('computeDocumentProgress', () => {
  it('goes from 0 at the top to 1 at the bottom', () => {
    expect(computeDocumentProgress(0, 5000, VIEWPORT_HEIGHT)).toBe(0);
    expect(computeDocumentProgress(4000, 5000, VIEWPORT_HEIGHT)).toBe(1);
  });
});

describe('findActiveSectionIndex', () => {
  it('activates a section once it crosses the reading line', () => {
    expect(findActiveSectionIndex(SECTIONS, 0, VIEWPORT_HEIGHT)).toBe(0);
    expect(findActiveSectionIndex(SECTIONS, 500, VIEWPORT_HEIGHT)).toBe(0);
    expect(findActiveSectionIndex(SECTIONS, 560, VIEWPORT_HEIGHT)).toBe(1);
  });
});

describe('computeAvatarTimeline', () => {
  it('holds the first pose at the top of the page', () => {
    expect(computeAvatarTimeline(SECTIONS, 0, VIEWPORT_HEIGHT)).toEqual({
      sectionIndex: 0,
      transitionProgress: 0,
      poseIndex: 0,
    });
  });

  it('transitions between two poses and switches at the midpoint', () => {
    const timeline = computeAvatarTimeline(SECTIONS, 425, VIEWPORT_HEIGHT);

    expect(timeline.sectionIndex).toBe(0);
    expect(timeline.transitionProgress).toBeCloseTo(0.5);
    expect(timeline.poseIndex).toBe(1);
  });

  it('holds the pose while a pinned section is being scrolled', () => {
    expect(computeAvatarTimeline(SECTIONS, 3000, VIEWPORT_HEIGHT).poseIndex).toBe(2);
  });

  it('holds the last pose past the end', () => {
    expect(computeAvatarTimeline(SECTIONS, 9000, VIEWPORT_HEIGHT).poseIndex).toBe(2);
  });
});

describe('computeBackgroundTint', () => {
  it('blends the tint of the two sections in transition', () => {
    const timeline = { sectionIndex: 0, transitionProgress: 0.5, poseIndex: 1 };

    expect(computeBackgroundTint([0, 4], timeline)).toBe(2);
  });
});
