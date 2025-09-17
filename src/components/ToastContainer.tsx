import React from "react";
import { Toast } from "../../hooks/toast-types";
import { ToastComponent } from "./ToastComponent";

interface Props {
  toasts: Toast[];
  onRemove: (id: string) => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center";
}

export default function ToastContainer({
  toasts,
  onRemove,
  position = "top-right",
}: Props) {
  const getPositionStyles = (position: string) => {
    switch (position) {
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      default:
        return "top-4 right-4";
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed z-50 ${getPositionStyles(position)}`}
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}
