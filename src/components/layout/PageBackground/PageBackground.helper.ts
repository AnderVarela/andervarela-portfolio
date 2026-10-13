import { useEffect, type RefObject } from 'react';

import { prefersReducedMotion } from '@/utils/mediaPreferences';

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const ACTIVE_ATTRIBUTE = 'data-active';

/* Fracción de la distancia al puntero que el foco recorre en cada fotograma. */
const FOLLOW_FACTOR = 0.14;
const SETTLED_DISTANCE = 0.5;

interface Point {
  x: number;
  y: number;
}

function hasFinePointer(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(FINE_POINTER_QUERY).matches;
}

/*
 * El foco de la rejilla sigue al puntero con inercia, no pegado a él. Las variables se
 * escriben en el propio foco, que no tiene hijos, para no recalcular estilos de la página.
 */
export function usePointerSpotlight(spotlightReference: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const spotlightElement = spotlightReference.current;

    if (!spotlightElement || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const target: Point = { x: 0, y: 0 };
    let current: Point | null = null;
    let animationFrameId: number | null = null;

    const follow = () => {
      if (!current) return;

      current.x += (target.x - current.x) * FOLLOW_FACTOR;
      current.y += (target.y - current.y) * FOLLOW_FACTOR;
      spotlightElement.style.setProperty('--pointer-x', `${current.x.toFixed(1)}px`);
      spotlightElement.style.setProperty('--pointer-y', `${current.y.toFixed(1)}px`);

      const isSettled =
        Math.abs(target.x - current.x) < SETTLED_DISTANCE &&
        Math.abs(target.y - current.y) < SETTLED_DISTANCE;

      animationFrameId = isSettled ? null : requestAnimationFrame(follow);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!current) {
        current = { ...target };
        spotlightElement.setAttribute(ACTIVE_ATTRIBUTE, '');
      }

      animationFrameId ??= requestAnimationFrame(follow);
    };

    const handlePointerLeave = () => {
      spotlightElement.removeAttribute(ACTIVE_ATTRIBUTE);
      current = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [spotlightReference]);
}
