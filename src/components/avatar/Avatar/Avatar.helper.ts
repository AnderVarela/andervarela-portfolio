import type { AvatarTimeline } from '@/stores/useScrollStore';
import { clamp, easeSmoothly, interpolate } from '@/utils/math';
import { ViewportModes, type ViewportMode } from '@/utils/viewport';

export interface Viewport {
  width: number;
  height: number;
}

export interface AvatarSize {
  width: number;
  height: number;
}

/* Centro del avatar en pantalla y escala respecto a su tamaño base. */
export interface AvatarPlacement {
  centerX: number;
  centerY: number;
  scale: number;
}

export interface PointerPosition {
  x: number;
  y: number;
}

export interface HeadTilt {
  horizontal: number;
  vertical: number;
}

export interface StageSnapshot {
  poseIndex: number;
  rectangle: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'width' | 'height'>;
}

export interface DominantStage {
  stage: StageSnapshot | null;
  visibleRatio: number;
  runnerUpVisibleRatio: number;
}

type LargeViewportMode = Exclude<ViewportMode, typeof ViewportModes.Mobile>;

const HEIGHT_IN_VIEWPORTS = 0.86;
const WIDTH_TO_HEIGHT_RATIO = 0.558;

/* Deben coincidir con --rail-width y --mobile-bar-height de layout.css. */
const RAIL_WIDTH_BY_MODE: Record<LargeViewportMode, number> = {
  [ViewportModes.Tablet]: 72,
  [ViewportModes.Desktop]: 200,
};
const MOBILE_BAR_HEIGHT = 56;

/* Posición horizontal del avatar en cada sección, como fracción del ancho de contenido. */
const HORIZONTAL_ANCHOR_BY_SECTION: Record<LargeViewportMode, readonly number[]> = {
  [ViewportModes.Tablet]: [0.74, 0.2, 0.73, 0.22, 0.5, 0.8, 0.5, 0.2],
  [ViewportModes.Desktop]: [0.76, 0.2, 0.73, 0.22, 0.5, 0.8, 0.5, 0.2],
};
const SCALE_BY_SECTION: Record<LargeViewportMode, readonly number[]> = {
  [ViewportModes.Tablet]: [0.95, 0.88, 0.88, 0.85, 0.85, 0.88, 0.85, 0.88],
  [ViewportModes.Desktop]: [1.08, 0.98, 0.98, 0.96, 0.96, 0.98, 0.96, 0.98],
};
const DEFAULT_HORIZONTAL_ANCHOR = 0.5;
const DEFAULT_SCALE = 1;

const POSE_CROSSFADE_START = 0.3;
const POSE_CROSSFADE_LENGTH = 0.4;

const HEAD_HEIGHT_RATIO = 0.22;
const POINTER_REACH_IN_VIEWPORT_WIDTHS = 0.35;
const POINTER_REACH_IN_VIEWPORT_HEIGHTS = 0.45;

const BREATHING_AMPLITUDE = 1.6;
const BREATHING_PERIOD_SECONDS = 4;

const ORBIT_CENTER = { x: 200, y: 70 };
const ORBIT_RADIUS = { x: 210, y: 34 };
const ORB_HALF_SIZE = 26;
const ORBIT_RADIANS_PER_MILLISECOND = 0.0011;
const ORBIT_ORB_COUNT = 4;

const STAGE_FILL_RATIO = 0.97;
const STAGE_HORIZONTAL_ANCHOR = 0.66;
const FIRST_STAGE_HORIZONTAL_ANCHOR = 0.62;
const STAGE_ENTRANCE_OFFSET = 28;

export function computeAvatarSize(viewportHeight: number): AvatarSize {
  const height = viewportHeight * HEIGHT_IN_VIEWPORTS;

  return { width: height * WIDTH_TO_HEIGHT_RATIO, height };
}

/* Dónde descansa el avatar mientras una sección ocupa la pantalla; siempre apoyado abajo. */
export function computeSectionPlacement(
  sectionIndex: number,
  viewport: Viewport,
  mode: LargeViewportMode,
): AvatarPlacement {
  const railWidth = RAIL_WIDTH_BY_MODE[mode];
  const horizontalAnchor =
    HORIZONTAL_ANCHOR_BY_SECTION[mode][sectionIndex] ?? DEFAULT_HORIZONTAL_ANCHOR;
  const scale = SCALE_BY_SECTION[mode][sectionIndex] ?? DEFAULT_SCALE;
  const avatarHeight = computeAvatarSize(viewport.height).height * scale;

  return {
    centerX: railWidth + horizontalAnchor * (viewport.width - railWidth),
    centerY: viewport.height - avatarHeight / 2,
    scale,
  };
}

export function interpolatePlacement(
  from: AvatarPlacement,
  to: AvatarPlacement,
  ratio: number,
): AvatarPlacement {
  return {
    centerX: interpolate(from.centerX, to.centerX, ratio),
    centerY: interpolate(from.centerY, to.centerY, ratio),
    scale: interpolate(from.scale, to.scale, ratio),
  };
}

export function computeTimelinePlacement(
  timeline: AvatarTimeline,
  viewport: Viewport,
  mode: LargeViewportMode,
): AvatarPlacement {
  return interpolatePlacement(
    computeSectionPlacement(timeline.sectionIndex, viewport, mode),
    computeSectionPlacement(timeline.sectionIndex + 1, viewport, mode),
    timeline.transitionProgress,
  );
}

/* Las poses de dos secciones consecutivas se funden en el tramo central de la transición. */
export function computePoseOpacity(poseIndex: number, timeline: AvatarTimeline): number {
  const crossfadeProgress = clamp(
    (timeline.transitionProgress - POSE_CROSSFADE_START) / POSE_CROSSFADE_LENGTH,
  );

  if (poseIndex === timeline.sectionIndex) return 1 - crossfadeProgress;
  if (poseIndex === timeline.sectionIndex + 1) return crossfadeProgress;
  return 0;
}

/* Hacia dónde gira la cabeza para mirar al puntero, de -1 a 1 en cada eje. */
export function computeHeadTilt(
  pointer: PointerPosition,
  placement: AvatarPlacement,
  viewport: Viewport,
): HeadTilt {
  const avatarHeight = computeAvatarSize(viewport.height).height * placement.scale;
  const headY = placement.centerY - avatarHeight / 2 + avatarHeight * HEAD_HEIGHT_RATIO;

  return {
    horizontal: clamp(
      (pointer.x - placement.centerX) / (viewport.width * POINTER_REACH_IN_VIEWPORT_WIDTHS),
      -1,
      1,
    ),
    vertical: clamp(
      (pointer.y - headY) / (viewport.height * POINTER_REACH_IN_VIEWPORT_HEIGHTS),
      -1,
      1,
    ),
  };
}

export function computeBreathingOffset(timeInMilliseconds: number): number {
  const breathingPhase = (timeInMilliseconds / 1000 / BREATHING_PERIOD_SECONDS) * 2 * Math.PI;

  return Math.sin(breathingPhase) * BREATHING_AMPLITUDE;
}

/* Posición de un icono de tecnología en la órbita, en coordenadas del lienzo del avatar. */
export function computeOrbPosition(orbIndex: number, timeInMilliseconds: number): PointerPosition {
  const angle =
    timeInMilliseconds * ORBIT_RADIANS_PER_MILLISECOND + (orbIndex * 2 * Math.PI) / ORBIT_ORB_COUNT;

  return {
    x: ORBIT_CENTER.x + Math.cos(angle) * ORBIT_RADIUS.x - ORB_HALF_SIZE,
    y: ORBIT_CENTER.y + Math.sin(angle) * ORBIT_RADIUS.y - ORB_HALF_SIZE,
  };
}

function computeStageVisibleRatio(stage: StageSnapshot, viewportHeight: number): number {
  const { top, bottom, height } = stage.rectangle;
  if (height === 0) return 0;

  const visibleHeight = Math.min(bottom, viewportHeight) - Math.max(top, MOBILE_BAR_HEIGHT);
  return clamp(visibleHeight / height);
}

/* En móvil el avatar se coloca sobre el escenario que más se ve en pantalla. */
export function selectDominantStage(
  stages: readonly StageSnapshot[],
  viewportHeight: number,
): DominantStage {
  const stagesByVisibility = stages
    .map((stage) => ({ stage, visibleRatio: computeStageVisibleRatio(stage, viewportHeight) }))
    .filter(({ visibleRatio }) => visibleRatio > 0)
    .sort((first, second) => second.visibleRatio - first.visibleRatio);
  const [mostVisible, runnerUp] = stagesByVisibility;

  return {
    stage: mostVisible?.stage ?? null,
    visibleRatio: mostVisible?.visibleRatio ?? 0,
    runnerUpVisibleRatio: runnerUp?.visibleRatio ?? 0,
  };
}

/* El avatar solo aparece cuando un escenario destaca con claridad sobre el resto. */
export function computeMobileOpacity(
  { visibleRatio, runnerUpVisibleRatio }: DominantStage,
  isMotionReduced: boolean,
): number {
  if (isMotionReduced) {
    return visibleRatio > 0.35 && visibleRatio > runnerUpVisibleRatio + 0.15 ? 1 : 0;
  }

  const dominance = easeSmoothly(clamp((visibleRatio - runnerUpVisibleRatio) / 0.4));
  return easeSmoothly(clamp((visibleRatio - 0.1) / 0.5)) * dominance;
}

export function computeStagePlacement(
  stage: StageSnapshot,
  viewportHeight: number,
  opacity: number,
): AvatarPlacement {
  const { left, width, height, bottom } = stage.rectangle;
  const scale = (height * STAGE_FILL_RATIO) / computeAvatarSize(viewportHeight).height;
  const horizontalAnchor =
    stage.poseIndex === 0 ? FIRST_STAGE_HORIZONTAL_ANCHOR : STAGE_HORIZONTAL_ANCHOR;
  const scaledHeight = computeAvatarSize(viewportHeight).height * scale;

  return {
    centerX: left + width * horizontalAnchor,
    centerY: bottom - scaledHeight / 2 + (1 - opacity) * STAGE_ENTRANCE_OFFSET,
    scale,
  };
}

export function buildPlacementTransform(placement: AvatarPlacement, size: AvatarSize): string {
  const left = placement.centerX - size.width / 2;
  const top = placement.centerY - size.height / 2;

  return `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0) scale(${placement.scale.toFixed(4)})`;
}
