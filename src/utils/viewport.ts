export const ViewportModes = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
} as const;

export type ViewportMode = (typeof ViewportModes)[keyof typeof ViewportModes];

export const TABLET_MINIMUM_WIDTH = 768;
export const DESKTOP_MINIMUM_WIDTH = 1024;

export function resolveViewportMode(viewportWidth: number): ViewportMode {
  if (viewportWidth < TABLET_MINIMUM_WIDTH) return ViewportModes.Mobile;
  if (viewportWidth < DESKTOP_MINIMUM_WIDTH) return ViewportModes.Tablet;
  return ViewportModes.Desktop;
}
