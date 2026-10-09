import { useEffect } from 'react';

import { useMobileMenuStore } from '@/stores/useMobileMenuStore';

const CLOSE_KEY = 'Escape';

/* Mientras el menú está abierto, Escape lo cierra y la página de fondo no hace scroll. */
export function useMobileMenuDismissal(isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return;

    function closeMenuOnEscape(event: KeyboardEvent): void {
      if (event.key === CLOSE_KEY) useMobileMenuStore.getState().closeMenu();
    }

    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', closeMenuOnEscape);

    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', closeMenuOnEscape);
    };
  }, [isOpen]);
}
