import { SECTIONS } from '@/content/sections';
import type { AvatarTimeline } from '@/stores/useScrollStore';
import { clamp, interpolate } from '@/utils/math';
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

type LargeViewportMode = Exclude<ViewportMode, typeof ViewportModes.Mobile>;

const HEIGHT_IN_VIEWPORTS = 0.86;
const WIDTH_TO_HEIGHT_RATIO = 0.558;

/* Debe coincidir con --rail-width de layout.css. */
const RAIL_WIDTH_BY_MODE: Record<LargeViewportMode, number> = {
  [ViewportModes.Tablet]: 72,
  [ViewportModes.Desktop]: 200,
};

/*
 * Posición horizontal del avatar en cada sección, como fracción del ancho de contenido.
 * Las secciones sin avatar repiten la de su vecina con avatar: así sale y entra en su sitio.
 */
const HORIZONTAL_ANCHOR_BY_SECTION: Record<LargeViewportMode, readonly number[]> = {
  [ViewportModes.Tablet]: [0.74, 0.74, 0.74, 0.5, 0.2, 0.2, 0.2],
  [ViewportModes.Desktop]: [0.76, 0.76, 0.76, 0.5, 0.2, 0.2, 0.2],
};
const SCALE_BY_SECTION: Record<LargeViewportMode, readonly number[]> = {
  [ViewportModes.Tablet]: [0.95, 0.95, 0.9, 0.9, 0.88, 0.88, 0.88],
  [ViewportModes.Desktop]: [1.08, 1.08, 1, 1, 0.98, 0.98, 0.98],
};
const DEFAULT_HORIZONTAL_ANCHOR = 0.5;
const DEFAULT_SCALE = 1;

/* En las secciones sin avatar baja por debajo del borde mientras se desvanece. */
const HIDDEN_DROP_IN_VIEWPORTS = 0.35;

const POSE_CROSSFADE_START = 0.3;
const POSE_CROSSFADE_LENGTH = 0.4;

const HEAD_HEIGHT_RATIO = 0.22;
const POINTER_REACH_IN_VIEWPORT_WIDTHS = 0.35;
const POINTER_REACH_IN_VIEWPORT_HEIGHTS = 0.45;

const BREATHING_AMPLITUDE = 1.6;
const BREATHING_PERIOD_SECONDS = 4;

export function computeAvatarSize(viewportHeight: number): AvatarSize {
  const height = viewportHeight * HEIGHT_IN_VIEWPORTS;

  return { width: height * WIDTH_TO_HEIGHT_RATIO, height };
}

/*
 * Dónde descansa el avatar mientras una sección ocupa la pantalla: apoyado abajo en las
 * secciones con avatar y hundido bajo el borde en las demás.
 */
export function computeSectionPlacement(
  sectionIndex: number,
  viewport: Viewport,
  mode: LargeViewportMode,
): AvatarPlacement {
  const railWidth = RAIL_WIDTH_BY_MODE[mode];
  const horizontalAnchor =
    HORIZONTAL_ANCHOR_BY_SECTION[mode][sectionIndex] ?? DEFAULT_HORIZONTAL_ANCHOR;
  const contentWidth = viewport.width - railWidth;
  const scale = SCALE_BY_SECTION[mode][sectionIndex] ?? DEFAULT_SCALE;
  const avatarHeight = computeAvatarSize(viewport.height).height * scale;
  const hasAvatar = SECTIONS[sectionIndex]?.hasAvatar ?? false;
  const drop = hasAvatar ? 0 : viewport.height * HIDDEN_DROP_IN_VIEWPORTS;

  return {
    centerX: railWidth + horizontalAnchor * contentWidth,
    centerY: viewport.height - avatarHeight / 2 + drop,
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

export function buildPlacementTransform(placement: AvatarPlacement, size: AvatarSize): string {
  const left = placement.centerX - size.width / 2;
  const top = placement.centerY - size.height / 2;

  return `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0) scale(${placement.scale.toFixed(4)})`;
}
