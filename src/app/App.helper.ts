import { useDocumentPreferences } from '@/preferences/useDocumentPreferences';
import { useDeepLinking } from '@/scroll/useDeepLinking';
import { useScrollChoreography } from '@/scroll/useScrollChoreography';

/* Comportamientos que afectan a toda la página y no pertenecen a ningún componente. */
export function usePageBehaviours(): void {
  useDocumentPreferences();
  useScrollChoreography();
  useDeepLinking();
}
