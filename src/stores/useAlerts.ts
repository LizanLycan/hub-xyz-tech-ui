import { create } from "zustand";

interface AlertsStore {
  openSuccess: boolean;
  openError: boolean;
  successMessage: string;
  errorMessage: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  closeSuccess: () => void;
  closeError: () => void;
}

export const CLOSE_TIMEOUT = 6000;

export const useAlerts = create<AlertsStore>((set) => ({
  openSuccess: false,
  openError: false,
  successMessage: "",
  errorMessage: "",
  onSuccess: (message) =>
    set((state) => ({
      ...state,
      successMessage: message,
      openSuccess: true,
      openError: false,
    })),
  onError: (message) =>
    set((state) => ({
      ...state,
      errorMessage: message,
      openSuccess: false,
      openError: true,
    })),
  closeSuccess: () =>
    set((state) => ({
      ...state,
      openSuccess: false,
    })),
  closeError: () =>
    set((state) => ({
      ...state,
      openError: false,
    })),
}));
