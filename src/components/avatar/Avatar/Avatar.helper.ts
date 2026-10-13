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

/* Posición horizontal del avatar en cada sección, como fracción del ancho de contenido. */
const HORIZONTAL_ANCHOR_BY_SECTION: Record<LargeViewportMode, readonly number[]> = {
  [ViewportModes.Tablet]: [0.74, 0.2, 0.73, 0.165, 0.5, 0.8, 0.5, 0.2],
  [ViewportModes.Desktop]: [0.76, 0.2, 0.73, 0.165, 0.5, 0.8, 0.5, 0.2],
};
const SCALE_BY_SECTION: Record<LargeViewportMode, readonly number[]> = {
  [ViewportModes.Tablet]: [0.95, 0.88, 0.88, 0.85, 0.85, 0.88, 0.85, 0.88],
  [ViewportModes.Desktop]: [1.08, 0.98, 0.98, 0.96, 0.96, 0.98, 0.96, 0.98],
};
/*
 * Ancho máximo del avatar en una sección, como fracción del ancho de contenido. En proyectos
 * es su hueco, --avatar-zone-projects de layout.css: así queda centrado en él y no pisa la pista.
 */
const MAXIMUM_WIDTH_BY_SECTION: Readonly<Record<number, number>> = { 3: 0.33 };
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
  const contentWidth = viewport.width - railWidth;
  const baseSize = computeAvatarSize(viewport.height);
  const maximumWidth = MAXIMUM_WIDTH_BY_SECTION[sectionIndex];
  const scale = Math.min(
    SCALE_BY_SECTION[mode][sectionIndex] ?? DEFAULT_SCALE,
    maximumWidth === undefined ? Infinity : (maximumWidth * contentWidth) / baseSize.width,
  );
  const avatarHeight = baseSize.height * scale;

  return {
    centerX: railWidth + horizontalAnchor * contentWidth,
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

export function buildPlacementTransform(placement: AvatarPlacement, size: AvatarSize): string {
  const left = placement.centerX - size.width / 2;
  const top = placement.centerY - size.height / 2;

  return `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0) scale(${placement.scale.toFixed(4)})`;
}
