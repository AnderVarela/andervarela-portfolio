import { useEffect, useRef, type RefObject } from 'react';

import { useScrollStore, type AvatarTimeline } from '@/stores/useScrollStore';
import { interpolate } from '@/utils/math';
import { prefersReducedMotion } from '@/utils/mediaPreferences';
import { resolveViewportMode, ViewportModes } from '@/utils/viewport';

import {
  buildPlacementTransform,
  computeAvatarSize,
  computeBreathingOffset,
  computeHeadTilt,
  computePoseOpacity,
  computeSectionPlacement,
  computeTimelinePlacement,
  interpolatePlacement,
  type AvatarPlacement,
  type PointerPosition,
  type Viewport,
} from './Avatar.helper';

const TILT_SELECTOR = '[data-avatar-tilt]';
const POSE_SELECTOR = '[data-avatar-pose]';

const PLACEMENT_EASING = 0.22;
const HEAD_TILT_EASING = 0.08;
const MAXIMUM_HEAD_TURN_DEGREES = 9;
const MAXIMUM_HEAD_NOD_DEGREES = 3;
const BREATHING_VERTICAL_FACTOR = 0.8;
const BREATHING_SCALE_FACTOR = 0.0025;
const WINK_DURATION_MILLISECONDS = 380;
const WINK_SCALE_BOOST = 0.03;
const REDUCED_MOTION_FADE_MILLISECONDS = 260;
const REDUCED_MOTION_FADE_TRANSITION = 'opacity 0.25s';
const MINIMUM_VISIBLE_OPACITY = 0.01;

interface PoseLayer {
  element: HTMLElement | SVGElement;
  poseIndex: number;
}

interface AvatarElements {
  root: HTMLElement;
  tilt: HTMLElement | null;
  poseLayers: PoseLayer[];
}

interface AvatarMotionState {
  pointer: PointerPosition;
  headTilt: { horizontal: number; vertical: number };
  placement: AvatarPlacement | null;
  /* Con movimiento reducido, la pose visible cambia por fundido en lugar de seguir al scroll. */
  settledPoseIndex: number | null;
  isFadingBetweenPoses: boolean;
  winkEndTime: number;
}

function createInitialMotionState(): AvatarMotionState {
  return {
    pointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 },
    headTilt: { horizontal: 0, vertical: 0 },
    placement: null,
    settledPoseIndex: null,
    isFadingBetweenPoses: false,
    winkEndTime: 0,
  };
}

function readPoseIndex(element: Element, attributeName: string): number {
  return Number(element.getAttribute(attributeName));
}

function collectAvatarElements(root: HTMLElement): AvatarElements {
  return {
    root,
    tilt: root.querySelector<HTMLElement>(TILT_SELECTOR),
    poseLayers: [...root.querySelectorAll<HTMLElement | SVGElement>(POSE_SELECTOR)].map(
      (element) => ({ element, poseIndex: readPoseIndex(element, 'data-avatar-pose') }),
    ),
  };
}

function readViewport(): Viewport {
  return { width: window.innerWidth, height: window.innerHeight };
}

function holdTimelineAt(poseIndex: number): AvatarTimeline {
  return { sectionIndex: poseIndex, transitionProgress: 0, poseIndex };
}

function applyPlacement(root: HTMLElement, placement: AvatarPlacement, viewport: Viewport): void {
  const size = computeAvatarSize(viewport.height);

  root.style.width = `${size.width}px`;
  root.style.height = `${size.height}px`;
  root.style.transform = buildPlacementTransform(placement, size);
}

/*
 * Funde las poses y, si ninguna se ve (secciones sin avatar), oculta el avatar entero:
 * así su zona de guiño no queda encima del contenido.
 */
function applyPoseOpacities(
  root: HTMLElement,
  poseLayers: readonly PoseLayer[],
  timeline: AvatarTimeline,
): void {
  let visibleOpacity = 0;

  poseLayers.forEach(({ element, poseIndex }) => {
    const opacity = computePoseOpacity(poseIndex, timeline);
    visibleOpacity += opacity;
    element.style.opacity = opacity.toFixed(3);
  });

  root.style.visibility = visibleOpacity > MINIMUM_VISIBLE_OPACITY ? '' : 'hidden';
}

/* Fundido entre poses para quien prefiere movimiento reducido. */
function settleOnPoseWithFade(
  root: HTMLElement,
  state: AvatarMotionState,
  targetPoseIndex: number,
): number {
  state.settledPoseIndex ??= targetPoseIndex;

  if (state.settledPoseIndex !== targetPoseIndex && !state.isFadingBetweenPoses) {
    state.isFadingBetweenPoses = true;
    root.style.transition = REDUCED_MOTION_FADE_TRANSITION;
    root.style.opacity = '0';
    setTimeout(() => {
      state.settledPoseIndex = useScrollStore.getState().avatarTimeline.poseIndex;
      state.isFadingBetweenPoses = false;
      root.style.opacity = '1';
    }, REDUCED_MOTION_FADE_MILLISECONDS);
  }

  return state.settledPoseIndex;
}

function renderStillFrame(elements: AvatarElements, state: AvatarMotionState): void {
  const viewport = readViewport();
  const mode = resolveViewportMode(viewport.width);
  if (mode === ViewportModes.Mobile) return;

  const scrollTimeline = useScrollStore.getState().avatarTimeline;
  const settledPoseIndex = settleOnPoseWithFade(elements.root, state, scrollTimeline.poseIndex);

  if (!state.isFadingBetweenPoses) elements.root.style.opacity = '1';
  applyPlacement(
    elements.root,
    computeSectionPlacement(settledPoseIndex, viewport, mode),
    viewport,
  );
  applyPoseOpacities(elements.root, elements.poseLayers, holdTimelineAt(settledPoseIndex));
  if (elements.tilt) elements.tilt.style.transform = '';
}

function renderAnimatedFrame(
  elements: AvatarElements,
  state: AvatarMotionState,
  time: number,
): void {
  const viewport = readViewport();
  const mode = resolveViewportMode(viewport.width);
  if (mode === ViewportModes.Mobile) return;

  const timeline = useScrollStore.getState().avatarTimeline;
  const targetPlacement = computeTimelinePlacement(timeline, viewport, mode);
  const placement = state.placement
    ? interpolatePlacement(state.placement, targetPlacement, PLACEMENT_EASING)
    : targetPlacement;
  const targetTilt = computeHeadTilt(state.pointer, placement, viewport);
  const breathing = computeBreathingOffset(time);
  const winkBoost = time < state.winkEndTime ? WINK_SCALE_BOOST : 0;

  state.placement = placement;
  state.settledPoseIndex = null;
  state.headTilt = {
    horizontal: interpolate(state.headTilt.horizontal, targetTilt.horizontal, HEAD_TILT_EASING),
    vertical: interpolate(state.headTilt.vertical, targetTilt.vertical, HEAD_TILT_EASING),
  };

  elements.root.style.transition = '';
  elements.root.style.opacity = '1';
  applyPlacement(elements.root, placement, viewport);
  applyPoseOpacities(elements.root, elements.poseLayers, timeline);

  if (elements.tilt) {
    const turn = state.headTilt.horizontal * MAXIMUM_HEAD_TURN_DEGREES;
    const nod = -state.headTilt.vertical * MAXIMUM_HEAD_NOD_DEGREES;
    const scale = 1 + breathing * BREATHING_SCALE_FACTOR + winkBoost;

    elements.tilt.style.transform = [
      `translateY(${(breathing * BREATHING_VERTICAL_FACTOR).toFixed(2)}px)`,
      'perspective(1200px)',
      `rotateY(${turn.toFixed(2)}deg)`,
      `rotateX(${nod.toFixed(2)}deg)`,
      `scale(${scale.toFixed(4)})`,
    ].join(' ');
  }
}

function renderAvatarFrame(elements: AvatarElements, state: AvatarMotionState, time: number): void {
  const isMobile = resolveViewportMode(window.innerWidth) === ViewportModes.Mobile;

  // En móvil el avatar va dibujado dentro de cada escenario y se desplaza con la página.
  // Al volver a tableta o escritorio se recoloca sin arrastrar la posición anterior.
  if (isMobile) state.placement = null;
  else if (prefersReducedMotion()) renderStillFrame(elements, state);
  else renderAnimatedFrame(elements, state, time);
}

/*
 * Mueve el avatar fotograma a fotograma: lo coloca según la sección, funde las poses,
 * hace que respire y que siga al puntero. Devuelve la función que dispara el guiño.
 */
export function useAvatarMotion(avatarReference: RefObject<HTMLElement | null>): () => void {
  const motionState = useRef<AvatarMotionState | null>(null);

  useEffect(() => {
    const avatarElement = avatarReference.current;
    if (!avatarElement) return;

    const elements = collectAvatarElements(avatarElement);
    const state = createInitialMotionState();
    motionState.current = state;

    function trackPointer(event: PointerEvent): void {
      state.pointer = { x: event.clientX, y: event.clientY };
    }

    function renderFrame(time: number): void {
      renderAvatarFrame(elements, state, time);
      animationFrameId = requestAnimationFrame(renderFrame);
    }

    window.addEventListener('pointermove', trackPointer, { passive: true });
    let animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('pointermove', trackPointer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [avatarReference]);

  return () => {
    if (motionState.current) {
      motionState.current.winkEndTime = performance.now() + WINK_DURATION_MILLISECONDS;
    }
  };
}
