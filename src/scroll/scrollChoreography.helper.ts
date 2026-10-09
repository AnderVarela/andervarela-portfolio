import type { AvatarTimeline } from '@/stores/useScrollStore';
import { clamp, easeSmoothly, interpolate } from '@/utils/math';

export interface SectionBounds {
  /* Distancia desde el inicio del documento. */
  top: number;
  height: number;
}

export interface SectionMotion {
  /* 0 cuando la sección asoma por abajo, 1 cuando ya ha entrado. */
  enterProgress: number;
  /* 0 mientras la sección sigue en pantalla, 1 cuando ha salido por arriba. */
  exitProgress: number;
  /* Avance por el tramo en el que la sección queda fijada. */
  pinnedProgress: number;
}

const ENTER_DISTANCE_IN_VIEWPORTS = 0.6;
const EXIT_DISTANCE_IN_VIEWPORTS = 0.35;
const ACTIVE_SECTION_THRESHOLD_IN_VIEWPORTS = 0.45;
const POSE_HOLD_LEAD_IN_VIEWPORTS = 0.25;
const POSE_HOLD_TAIL_IN_VIEWPORTS = 0.1;
const POSE_SWITCH_POINT = 0.5;

interface HoldRange {
  start: number;
  end: number;
}

export function computeSectionMotion(
  topInViewport: number,
  height: number,
  viewportHeight: number,
): SectionMotion {
  const bottomInViewport = topInViewport + height;
  const exitDistance = viewportHeight * EXIT_DISTANCE_IN_VIEWPORTS;

  return {
    enterProgress: clamp(
      (viewportHeight - topInViewport) / (viewportHeight * ENTER_DISTANCE_IN_VIEWPORTS),
    ),
    exitProgress: clamp((exitDistance - bottomInViewport) / exitDistance),
    pinnedProgress: clamp(-topInViewport / Math.max(1, height - viewportHeight)),
  };
}

export function computeDocumentProgress(
  scrollPosition: number,
  documentHeight: number,
  viewportHeight: number,
): number {
  return clamp(scrollPosition / Math.max(1, documentHeight - viewportHeight));
}

export function findActiveSectionIndex(
  sections: readonly SectionBounds[],
  scrollPosition: number,
  viewportHeight: number,
): number {
  const readingLine = scrollPosition + viewportHeight * ACTIVE_SECTION_THRESHOLD_IN_VIEWPORTS;

  return Math.max(
    0,
    sections.findLastIndex((section) => readingLine >= section.top),
  );
}

/* Tramo de scroll durante el que el avatar mantiene quieta la pose de una sección. */
function computeHoldRange(section: SectionBounds, viewportHeight: number): HoldRange {
  const pinnedDistance = Math.max(0, section.height - viewportHeight);

  return {
    start: section.top - viewportHeight * POSE_HOLD_LEAD_IN_VIEWPORTS,
    end: section.top + pinnedDistance + viewportHeight * POSE_HOLD_TAIL_IN_VIEWPORTS,
  };
}

function holdPose(sectionIndex: number): AvatarTimeline {
  return { sectionIndex, transitionProgress: 0, poseIndex: sectionIndex };
}

export function computeAvatarTimeline(
  sections: readonly SectionBounds[],
  scrollPosition: number,
  viewportHeight: number,
): AvatarTimeline {
  const holdRanges = sections.map((section) => computeHoldRange(section, viewportHeight));
  const lastSectionIndex = Math.max(0, holdRanges.length - 1);
  const upcomingIndex = holdRanges.findIndex((holdRange) => scrollPosition <= holdRange.end);

  if (upcomingIndex === -1) return holdPose(lastSectionIndex);

  const upcomingHold = holdRanges[upcomingIndex];
  const previousHold = holdRanges[upcomingIndex - 1];
  const isHolding = !upcomingHold || !previousHold || scrollPosition >= upcomingHold.start;

  if (isHolding) return holdPose(upcomingIndex);

  const sectionIndex = upcomingIndex - 1;
  const transitionProgress = easeSmoothly(
    (scrollPosition - previousHold.end) / (upcomingHold.start - previousHold.end),
  );

  return {
    sectionIndex,
    transitionProgress,
    poseIndex: transitionProgress < POSE_SWITCH_POINT ? sectionIndex : upcomingIndex,
  };
}

export function computeBackgroundTint(
  tintBySection: readonly number[],
  timeline: AvatarTimeline,
): number {
  const currentTint = tintBySection[timeline.sectionIndex] ?? 0;
  const nextTint = tintBySection[timeline.sectionIndex + 1] ?? currentTint;

  return interpolate(currentTint, nextTint, timeline.transitionProgress);
}
