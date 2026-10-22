import { ViewportModes } from '@/utils/viewport';

import { computeAvatarSize, computePoseOpacity, computeSectionPlacement } from './Avatar.helper';

const VIEWPORT = { width: 1400, height: 1000 };

const HOME_INDEX = 0;
const ABOUT_INDEX = 1;
const CONTACT_INDEX = 6;

describe('computeSectionPlacement', () => {
  it('rests the avatar on the bottom edge of the viewport in the sections that have it', () => {
    const placement = computeSectionPlacement(CONTACT_INDEX, VIEWPORT, ViewportModes.Desktop);
    const scaledHeight = computeAvatarSize(VIEWPORT.height).height * placement.scale;

    expect(placement.centerY + scaledHeight / 2).toBeCloseTo(VIEWPORT.height);
  });

  it('places the avatar on the right for "home" and on the left for "contact"', () => {
    const home = computeSectionPlacement(HOME_INDEX, VIEWPORT, ViewportModes.Desktop);
    const contact = computeSectionPlacement(CONTACT_INDEX, VIEWPORT, ViewportModes.Desktop);

    expect(home.centerX).toBeGreaterThan(VIEWPORT.width / 2);
    expect(contact.centerX).toBeLessThan(VIEWPORT.width / 2);
  });

  it('drops the avatar below the bottom edge, where it came from, in sections without it', () => {
    const home = computeSectionPlacement(HOME_INDEX, VIEWPORT, ViewportModes.Desktop);
    const about = computeSectionPlacement(ABOUT_INDEX, VIEWPORT, ViewportModes.Desktop);

    expect(about.centerX).toBeCloseTo(home.centerX);
    expect(about.centerY).toBeGreaterThan(home.centerY);
  });
});

describe('computePoseOpacity', () => {
  it('shows no pose while holding on a section without avatar', () => {
    const timeline = { sectionIndex: ABOUT_INDEX, transitionProgress: 0, poseIndex: ABOUT_INDEX };

    expect(computePoseOpacity(HOME_INDEX, timeline)).toBe(0);
    expect(computePoseOpacity(CONTACT_INDEX, timeline)).toBe(0);
  });

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
