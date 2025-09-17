import { useState, useCallback } from "react";
import { Toast, ToastType } from "./toast-types";

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string,
      duration: number = 5000
    ) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);

      const newToast: Toast = {
        id,
        type,
        title,
        message,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message?: string, duration?: number) =>
      addToast("success", title, message, duration),
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) =>
      addToast("error", title, message, duration),
    [addToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) =>
      addToast("warning", title, message, duration),
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) =>
      addToast("info", title, message, duration),
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};
