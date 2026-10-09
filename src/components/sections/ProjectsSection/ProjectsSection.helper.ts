import { useEffect, useRef, useState, type RefObject } from 'react';

/* Aire que queda tras la última tarjeta cuando la pista llega al final. */
const TRACK_END_SPACING = 56;
const SCROLL_PER_OVERFLOW_PIXEL = 1.1;
const PINNED_BASE_HEIGHT = '120vh';

interface ProjectsTrackMeasurement {
  trackWindowReference: RefObject<HTMLDivElement | null>;
  trackReference: RefObject<HTMLDivElement | null>;
  /* Píxeles de pista que no caben en la ventana y hay que recorrer en horizontal. */
  overflowDistance: number;
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
      const hiddenWidth = trackElement.scrollWidth - trackWindowElement.clientWidth;
      setOverflowDistance(Math.max(0, Math.round(hiddenWidth + TRACK_END_SPACING)));
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
