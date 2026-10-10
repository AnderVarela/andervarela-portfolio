import { useEffect } from 'react';

import { useMobileMenuStore } from '@/stores/useMobileMenuStore';
import { TABLET_MINIMUM_WIDTH } from '@/utils/viewport';

/* A partir de tableta el menú no existe: si la ventana crece, se cierra solo. */
export function useCloseMenuBeyondMobile(): void {
  useEffect(() => {
    function closeMenuWhenViewportGrows(): void {
      if (window.innerWidth >= TABLET_MINIMUM_WIDTH) useMobileMenuStore.getState().closeMenu();
    }

    window.addEventListener('resize', closeMenuWhenViewportGrows);
    return () => {
      window.removeEventListener('resize', closeMenuWhenViewportGrows);
    };
  }, []);
}
