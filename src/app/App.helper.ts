import { useMobileMenuStore } from '@/stores/useMobileMenuStore';
import { useProjectDetailStore } from '@/stores/useProjectDetailStore';
import { useDocumentPreferences } from '@/preferences/useDocumentPreferences';
import { useDeepLinking } from '@/scroll/useDeepLinking';
import { useScrollChoreography } from '@/scroll/useScrollChoreography';

/* Comportamientos que afectan a toda la página y no pertenecen a ningún componente. */
export function usePageBehaviours(): void {
  useDocumentPreferences();
  useScrollChoreography();
  useDeepLinking();
}

/* Con una superposición abierta, el resto de la página queda fuera del foco y de los lectores. */
export function useIsOverlayOpen(): boolean {
  const isProjectDetailOpen = useProjectDetailStore((state) => state.openProjectIndex !== null);
  const isMobileMenuOpen = useMobileMenuStore((state) => state.isOpen);

  return isProjectDetailOpen || isMobileMenuOpen;
}
