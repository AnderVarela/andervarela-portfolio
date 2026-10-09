import { useEffect, useRef, type RefObject } from 'react';

import { prefersReducedMotion } from '@/utils/mediaPreferences';

const CLOSE_KEY = 'Escape';
const FOCUS_CYCLE_KEY = 'Tab';
const FOCUSABLE_SELECTOR = 'button:not([disabled]), a[href]';

function findFocusTargetWhenCycling(
  dialogElement: HTMLElement,
  isMovingBackwards: boolean,
): HTMLElement | null {
  const focusableElements = [...dialogElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)];
  const firstElement = focusableElements.at(0);
  const lastElement = focusableElements.at(-1);
  const focusedElement = document.activeElement;

  if (!firstElement || !lastElement) return null;
  if (!dialogElement.contains(focusedElement)) return firstElement;
  if (isMovingBackwards && focusedElement === firstElement) return lastElement;
  if (!isMovingBackwards && focusedElement === lastElement) return firstElement;
  return null;
}

/* Escape cierra el diálogo y Tab no deja que el foco salga de él. */
export function useDialogKeyboard(
  dialogReference: RefObject<HTMLElement | null>,
  onClose: () => void,
): void {
  const latestOnClose = useRef(onClose);

  useEffect(() => {
    latestOnClose.current = onClose;
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === CLOSE_KEY) latestOnClose.current();
      if (event.key !== FOCUS_CYCLE_KEY || !dialogReference.current) return;

      const focusTarget = findFocusTargetWhenCycling(dialogReference.current, event.shiftKey);
      if (focusTarget) {
        event.preventDefault();
        focusTarget.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dialogReference]);
}

/*
 * Lleva el foco al diálogo al abrirlo y lo devuelve a quien lo abrió al cerrarlo.
 * El retardo deja terminar la animación de apertura antes de mover el foco.
 */
export function useDialogFocus(
  initialFocusReference: RefObject<HTMLElement | null>,
  openingAnimationMilliseconds = 0,
): void {
  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    const focusTimeoutId = setTimeout(
      () => initialFocusReference.current?.focus({ preventScroll: true }),
      prefersReducedMotion() ? 0 : openingAnimationMilliseconds,
    );

    return () => {
      clearTimeout(focusTimeoutId);
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus({ preventScroll: true });
      }
    };
  }, [initialFocusReference, openingAnimationMilliseconds]);
}

/* Mientras hay un diálogo abierto la página de fondo no hace scroll. */
export function usePageScrollLock(): void {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);
}
