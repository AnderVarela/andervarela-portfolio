import { MobileMenuPanel } from '@/components/navigation/MobileMenuPanel/MobileMenuPanel';
import { useMobileMenuStore } from '@/stores/useMobileMenuStore';

/* Capa 5: el menú a pantalla completa se monta solo mientras está abierto. */
export function MobileMenu() {
  const isOpen = useMobileMenuStore((state) => state.isOpen);

  return isOpen ? <MobileMenuPanel /> : null;
}
