import { useEffect, useRef, useState } from 'react';

const COPIED_FEEDBACK_MILLISECONDS = 2000;

interface ClipboardCopy {
  isCopied: boolean;
  copyToClipboard: () => void;
}

/* Copia el texto y mantiene durante un momento la confirmación de que se ha copiado. */
export function useClipboardCopy(text: string): ClipboardCopy {
  const [isCopied, setIsCopied] = useState(false);
  const feedbackTimeoutId = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(feedbackTimeoutId.current);
    };
  }, []);

  function copyToClipboard(): void {
    // Sin permiso de portapapeles no hay nada que confirmar.
    void navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      clearTimeout(feedbackTimeoutId.current);
      feedbackTimeoutId.current = setTimeout(() => {
        setIsCopied(false);
      }, COPIED_FEEDBACK_MILLISECONDS);
    });
  }

  return { isCopied, copyToClipboard };
}
