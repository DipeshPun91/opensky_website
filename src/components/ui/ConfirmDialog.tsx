"use client";

import { useEffect, useRef } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Focus management
      if (cancelButtonRef.current) {
        cancelButtonRef.current.focus();
      }
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isLoading]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: "text-red-500",
      bg: "bg-red-500/10",
      button: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
      border: "border-red-500/20",
    },
    warning: {
      icon: "text-amber-500",
      bg: "bg-amber-500/10",
      button: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500",
      border: "border-amber-500/20",
    },
    info: {
      icon: "text-sky-500",
      bg: "bg-sky-500/10",
      button: "bg-sky-500 hover:bg-sky-600 focus:ring-sky-500",
      border: "border-sky-500/20",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
      }}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md transform overflow-hidden rounded-2xl border border-white/10 bg-gray-900 p-6 text-left align-middle shadow-2xl transition-all"
        style={{
          animation: "dialogIn 0.2s ease-out",
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-full ${styles.bg} p-2`}>
              <FiAlertTriangle className={`h-5 w-5 ${styles.icon}`} />
            </div>
            <h3 className="text-lg font-semibold leading-6 text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close dialog"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-300">{message}</p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex w-full justify-center rounded-lg border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${styles.button}`}
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>

      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes dialogIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
