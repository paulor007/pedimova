import { CircleAlert, CircleCheck, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "../../../lib/cn";
import { IconButton } from "../IconButton";
import { ToastContext, type ToastApi, type ToastTone } from "./toastContext";

type Toast = {
  id: number;
  tone: ToastTone;
  message: string;
};

/** Keep only the three newest messages. */
const MAX_VISIBLE = 3;

/** Success disappears after 5 seconds; errors require manual dismissal. */
const SUCCESS_DURATION_MS = 5000;

type ToastMessageProps = {
  toast: Toast;
  onDismiss: (id: number) => void;
};

function ToastMessage({ toast, onDismiss }: ToastMessageProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const paused = hovered || focused;
  const isError = toast.tone === "error";
  const Icon = isError ? CircleAlert : CircleCheck;

  // Close success messages unless the person is reading them.
  useEffect(() => {
    if (isError || paused) {
      return;
    }

    const timer = window.setTimeout(
      () => onDismiss(toast.id),
      SUCCESS_DURATION_MS,
    );

    return () => window.clearTimeout(timer);
  }, [isError, paused, onDismiss, toast.id]);

  return (
    <div
      role={isError ? "alert" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="pointer-events-auto flex items-start gap-3 rounded-card border border-line-strong bg-surface-raised py-3 pr-2 pl-4 shadow-overlay motion-safe:animate-rise"
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "mt-3 size-5 shrink-0",
          isError ? "text-danger" : "text-success",
        )}
      />

      <p className="min-w-0 flex-1 py-2.5 text-sm text-fg">{toast.message}</p>

      <IconButton
        icon={X}
        label="Fechar mensagem"
        onClick={() => onDismiss(toast.id)}
      />
    </div>
  );
}

/** Makes quick messages available throughout the application. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  // Keep the API stable so consumers do not re-render unnecessarily.
  const api = useMemo<ToastApi>(() => {
    function show(tone: ToastTone, message: string) {
      const id = nextId.current;
      nextId.current += 1;

      setToasts((current) =>
        [...current, { id, tone, message }].slice(-MAX_VISIBLE),
      );
    }

    return {
      success: (message) => show("success", message),
      error: (message) => show("error", message),
    };
  }, []);

  return (
    <ToastContext value={api}>
      {children}

      {/* Always present so added messages can be announced */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96"
      >
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext>
  );
}
