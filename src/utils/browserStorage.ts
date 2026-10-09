/* El almacenamiento puede no estar disponible (modo privado, bloqueo de datos del sitio). */

export function readStoredValue(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function storeValue(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Sin almacenamiento la preferencia solo dura esta visita.
  }
}
