import React, { useCallback, useEffect, useState } from "react";
import { Toast, ToastType } from "../../hooks/toast-types";

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
    setTimeout(() => onRemove(toast.id), 300);
  }, [onRemove, toast.id]);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleRemove]);

  const getToastStyles = (type: ToastType) => {
    const baseStyles = "border-l-4 p-4 rounded-lg shadow-lg";

    switch (type) {
      case "success":
        return `${baseStyles} bg-green-50 border-green-400 text-green-800`;
      case "error":
        return `${baseStyles} bg-red-50 border-red-400 text-red-800`;
      case "warning":
        return `${baseStyles} bg-yellow-50 border-yellow-400 text-yellow-800`;
      case "info":
        return `${baseStyles} bg-blue-50 border-blue-400 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-50 border-gray-400 text-gray-800`;
    }
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "";
    }
  };

  return (
    <div
      className={`
        ${getToastStyles(toast.type)}
        transition-all duration-300 ease-in-out transform
        ${
          isVisible && !isLeaving
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
        mb-2 min-w-80 max-w-md cursor-pointer
      `}
      onClick={handleRemove}
    >
      <div className="flex items-start">
        <span className="mr-3 text-lg flex-shrink-0">
          {getIcon(toast.type)}
        </span>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm mt-1 opacity-90">{toast.message}</p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          className="ml-2 text-lg opacity-60 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  );
}
