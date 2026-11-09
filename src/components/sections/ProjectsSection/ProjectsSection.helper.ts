import { useEffect, useRef, useState, type RefObject } from 'react';

import { clamp } from '@/utils/math';

const SCROLL_PER_OVERFLOW_PIXEL = 1.1;
const PINNED_BASE_HEIGHT = '120vh';
const SECTION_SELECTOR = '[data-section]';
/* Firefox puede medir la rueda en líneas; se pasan a píxeles con el alto de línea habitual. */
const PIXELS_PER_WHEEL_LINE = 16;

interface ProjectsTrackMeasurement {
  trackWindowReference: RefObject<HTMLDivElement | null>;
  trackReference: RefObject<HTMLDivElement | null>;
  /* Píxeles de pista que no caben en la ventana y hay que recorrer en horizontal. */
  overflowDistance: number;
}

export interface PinnedScrollRange {
  /* Scroll de la página en el que la sección se fija y en el que se suelta. */
  start: number;
  end: number;
}

/*
 * Lo que la pista debe desplazarse para que la última tarjeta quede alineada con el margen
 * derecho, igual que la primera con el izquierdo. El margen es el relleno de la ventana.
 */
export function computeTrackOverflow(
  trackWidth: number,
  windowWidth: number,
  windowHorizontalPadding: number,
): number {
  return Math.max(0, Math.round(trackWidth - (windowWidth - windowHorizontalPadding)));
}

function readHorizontalPadding(element: HTMLElement): number {
  const style = window.getComputedStyle(element);

  return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
}

export function useProjectsTrackOverflow(): ProjectsTrackMeasurement {
  const trackWindowReference = useRef<HTMLDivElement>(null);
  const trackReference = useRef<HTMLDivElement>(null);
  const [overflowDistance, setOverflowDistance] = useState(0);

  useEffect(() => {
    const trackWindowElement = trackWindowReference.current;
    const trackElement = trackReference.current;
    if (!trackWindowElement || !trackElement || typeof ResizeObserver === 'undefined') return;

    const resizeObserver = new ResizeObserver(() => {
      setOverflowDistance(
        computeTrackOverflow(
          trackElement.scrollWidth,
          trackWindowElement.clientWidth,
          readHorizontalPadding(trackWindowElement),
        ),
      );
    });
    resizeObserver.observe(trackWindowElement);
    resizeObserver.observe(trackElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { trackWindowReference, trackReference, overflowDistance };
}

/* El scroll vertical de la sección fijada se convierte en desplazamiento horizontal. */
export function computePinnedHeight(overflowDistance: number): string {
  const horizontalScrollLength = Math.round(overflowDistance * SCROLL_PER_OVERFLOW_PIXEL);

  return `calc(${PINNED_BASE_HEIGHT} + ${horizontalScrollLength}px)`;
}

/*
 * A qué scroll de página corresponde un gesto horizontal: la pista avanza lo mismo que el
 * gesto, y nunca se sale del tramo fijado, para no arrastrar la página fuera de la sección.
 */
export function computeHorizontalGestureScroll(
  currentScroll: number,
  horizontalDelta: number,
  overflowDistance: number,
  range: PinnedScrollRange,
): number {
  const pinnedDistance = range.end - range.start;
  const scrollPerTrackPixel = pinnedDistance / Math.max(1, overflowDistance);
  const targetScroll = currentScroll + horizontalDelta * scrollPerTrackPixel;

  return clamp(targetScroll, range.start, range.end);
}

function readPinnedScrollRange(sectionElement: Element): PinnedScrollRange {
  const sectionRectangle = sectionElement.getBoundingClientRect();
  const start = sectionRectangle.top + window.scrollY;

  return { start, end: start + sectionRectangle.height - window.innerHeight };
}

function readHorizontalDelta(event: WheelEvent): number {
  return event.deltaMode === WheelEvent.DOM_DELTA_LINE
    ? event.deltaX * PIXELS_PER_WHEEL_LINE
    : event.deltaX;
}

/*
 * Un gesto horizontal sobre la pista (trackpad o Mayús + rueda) la mueve igual que el scroll
 * vertical. Solo actúa con la sección fijada en pantalla; el gesto vertical no se toca.
 */
export function useHorizontalGestureScrolling(
  trackWindowReference: RefObject<HTMLDivElement | null>,
  overflowDistance: number,
): void {
  useEffect(() => {
    const trackWindowElement = trackWindowReference.current;
    const sectionElement = trackWindowElement?.closest(SECTION_SELECTOR);
    if (!trackWindowElement || !sectionElement || overflowDistance === 0) return;

    function scrollWithHorizontalGesture(event: WheelEvent): void {
      if (!sectionElement || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      const range = readPinnedScrollRange(sectionElement);
      const isPinnedOnScreen = window.scrollY >= range.start - 1 && window.scrollY <= range.end + 1;
      if (!isPinnedOnScreen) return;

      // También evita que el gesto del trackpad navegue atrás o adelante en el historial.
      event.preventDefault();
      window.scrollTo({
        top: computeHorizontalGestureScroll(
          window.scrollY,
          readHorizontalDelta(event),
          overflowDistance,
          range,
        ),
        behavior: 'instant',
      });
    }

    trackWindowElement.addEventListener('wheel', scrollWithHorizontalGesture, { passive: false });

    return () => {
      trackWindowElement.removeEventListener('wheel', scrollWithHorizontalGesture);
    };
  }, [trackWindowReference, overflowDistance]);
}
