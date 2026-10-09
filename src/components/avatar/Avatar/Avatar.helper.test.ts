import { ViewportModes } from '@/utils/viewport';

import {
  computeAvatarSize,
  computeMobileOpacity,
  computePoseOpacity,
  computeSectionPlacement,
  selectDominantStage,
  type StageSnapshot,
} from './Avatar.helper';

const VIEWPORT = { width: 1400, height: 1000 };

function createStage(poseIndex: number, top: number, height: number): StageSnapshot {
  return { poseIndex, rectangle: { top, bottom: top + height, left: 0, width: 300, height } };
}

describe('computeSectionPlacement', () => {
  it('rests the avatar on the bottom edge of the viewport', () => {
    const placement = computeSectionPlacement(1, VIEWPORT, ViewportModes.Desktop);
    const scaledHeight = computeAvatarSize(VIEWPORT.height).height * placement.scale;

    expect(placement.centerY + scaledHeight / 2).toBeCloseTo(VIEWPORT.height);
  });

  it('places the avatar on the left for "about" and on the right for "home"', () => {
    const home = computeSectionPlacement(0, VIEWPORT, ViewportModes.Desktop);
    const about = computeSectionPlacement(1, VIEWPORT, ViewportModes.Desktop);

    expect(about.centerX).toBeLessThan(VIEWPORT.width / 2);
    expect(home.centerX).toBeGreaterThan(VIEWPORT.width / 2);
  });
});

describe('computePoseOpacity', () => {
  it('shows only the current pose while holding', () => {
    const timeline = { sectionIndex: 2, transitionProgress: 0, poseIndex: 2 };

    expect(computePoseOpacity(2, timeline)).toBe(1);
    expect(computePoseOpacity(3, timeline)).toBe(0);
  });

  it('crossfades both poses halfway through a transition', () => {
    const timeline = { sectionIndex: 2, transitionProgress: 0.5, poseIndex: 3 };

    expect(computePoseOpacity(2, timeline)).toBeCloseTo(0.5);
    expect(computePoseOpacity(3, timeline)).toBeCloseTo(0.5);
  });
});

describe('selectDominantStage', () => {
  it('picks the stage with the largest visible share', () => {
    const stages = [createStage(0, -250, 300), createStage(1, 300, 400)];

    const dominantStage = selectDominantStage(stages, VIEWPORT.height);

    expect(dominantStage.stage?.poseIndex).toBe(1);
    expect(dominantStage.visibleRatio).toBe(1);
  });

  it('hides the avatar when no stage is on screen', () => {
    const dominantStage = selectDominantStage([createStage(0, 2000, 300)], VIEWPORT.height);

    expect(dominantStage.stage).toBeNull();
    expect(computeMobileOpacity(dominantStage, false)).toBe(0);
  });
});
