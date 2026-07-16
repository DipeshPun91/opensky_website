"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast, { ToastType } from "@/components/ui/Toast";

interface ToastItem {
  id: string;
  message: string;
  subText?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (
    message: string,
    type?: ToastType,
    subText?: string,
    duration?: number,
  ) => void;
  showSuccess: (message: string, subText?: string, duration?: number) => void;
  showError: (message: string, subText?: string, duration?: number) => void;
  showWarning: (message: string, subText?: string, duration?: number) => void;
  showInfo: (message: string, subText?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (
    message: string,
    type: ToastType = "info",
    subText: string = "",
    duration: number = 5000,
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      id,
      message,
      subText,
      type,
      duration,
    };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const showSuccess = (
    message: string,
    subText?: string,
    duration?: number,
  ) => {
    showToast(message, "success", subText, duration);
  };

  const showError = (message: string, subText?: string, duration?: number) => {
    showToast(message, "error", subText, duration);
  };

  const showWarning = (
    message: string,
    subText?: string,
    duration?: number,
  ) => {
    showToast(message, "warning", subText, duration);
  };

  const showInfo = (message: string, subText?: string, duration?: number) => {
    showToast(message, "info", subText, duration);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}

      {/* Toast Container - positioned at bottom-right */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              message={toast.message}
              subText={toast.subText}
              type={toast.type}
              onClose={removeToast}
              duration={toast.duration}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
