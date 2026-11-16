import { createContext } from "react";

export type ToastTone = "success" | "error";

/** What any component can do with quick messages. */
export type ToastApi = {
  success: (message: string) => void;
  error: (message: string) => void;
};

/** Filled by ToastProvider; null means the provider is missing. */
export const ToastContext = createContext<ToastApi | null>(null);
