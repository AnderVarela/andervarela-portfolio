const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const LIGHT_COLOR_SCHEME_QUERY = '(prefers-color-scheme: light)';

function matchesMediaQuery(query: string): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
}

export function prefersReducedMotion(): boolean {
  return matchesMediaQuery(REDUCED_MOTION_QUERY);
}

export function prefersLightColorScheme(): boolean {
  return matchesMediaQuery(LIGHT_COLOR_SCHEME_QUERY);
}
