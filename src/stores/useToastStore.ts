import { create } from 'zustand';

const TOAST_VISIBLE_MILLISECONDS = 2400;

interface ToastState {
  message: string | null;
  showToast: (message: string) => void;
}

let dismissTimeoutId: ReturnType<typeof setTimeout> | undefined;

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  showToast: (message) => {
    clearTimeout(dismissTimeoutId);
    set({ message });
    dismissTimeoutId = setTimeout(() => {
      set({ message: null });
    }, TOAST_VISIBLE_MILLISECONDS);
  },
}));
