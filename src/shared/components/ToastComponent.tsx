import React, { useCallback, useEffect, useState } from "react";
import { Toast, ToastType } from "../../../hooks/toast-types";
import { X } from "lucide-react";

type Props = {
  toast: Toast;
  onRemove: (id: string) => void;
};

export function ToastComponent({ toast, onRemove }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => onRemove(toast.id), 250);
  }, [onRemove, toast.id]);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(handleRemove, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleRemove]);

  const accentColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-emerald-500";
      case "error":
        return "bg-rose-500";
      case "warning":
        return "bg-amber-500";
      case "info":
        return "bg-sky-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div
      onClick={handleRemove}
      className={`
        relative flex gap-3 overflow-hidden
        rounded-xl border border-slate-200 bg-white
        px-4 py-3 shadow-md
        transition-all duration-300 ease-out
        cursor-pointer
        dark:border-slate-800 dark:bg-slate-900
        ${
          isVisible && !isLeaving
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0"
        }
      `}
    >
      {/* Accent bar */}
      <div className={`w-1 rounded-full ${accentColor(toast.type)}`} />

      <div className="flex-1">
        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {toast.title}
        </h4>

        {toast.message && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {toast.message}
          </p>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        className="
          text-slate-400 hover:text-slate-600
          dark:hover:text-slate-300
          transition-colors
        "
        aria-label="Close"
      >
        <X />
      </button>
    </div>
  );
}
