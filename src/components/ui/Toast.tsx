"use client";

import React, { useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string;
  message: string;
  subText?: string;
  type?: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  subText = "",
  type = "info",
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getToastConfig = () => {
    const config = {
      success: {
        icon: FaCheckCircle,
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        iconColor: "text-green-400",
        textColor: "text-white",
        subTextColor: "text-green-300/80",
        progressColor: "bg-green-400",
      },
      error: {
        icon: FaExclamationCircle,
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        iconColor: "text-red-400",
        textColor: "text-white",
        subTextColor: "text-red-300/80",
        progressColor: "bg-red-400",
      },
      warning: {
        icon: FaExclamationTriangle,
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        iconColor: "text-yellow-400",
        textColor: "text-white",
        subTextColor: "text-yellow-300/80",
        progressColor: "bg-yellow-400",
      },
      info: {
        icon: FaInfoCircle,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        iconColor: "text-blue-400",
        textColor: "text-white",
        subTextColor: "text-blue-300/80",
        progressColor: "bg-blue-400",
      },
    };
    return config[type] || config.info;
  };

  const {
    icon: Icon,
    bgColor,
    borderColor,
    iconColor,
    textColor,
    subTextColor,
    progressColor,
  } = getToastConfig();

  return (
    <div
      className={`
        w-80 sm:w-96 rounded-lg border p-4 bg-gray-950 shadow-lg shadow-black/50
        relative overflow-hidden flex items-start gap-3
        animate-in slide-in-from-right fade-in duration-300
        ${borderColor}
      `}
      role="alert"
    >
      {/* Decorative wave background */}
      <svg
        className={`absolute -left-10 top-10 w-24 rotate-90 fill-current opacity-20 ${iconColor}`}
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
          fillOpacity="1"
        />
      </svg>

      {/* Icon container */}
      <div className={`p-2 rounded-full ${bgColor} shrink-0 relative z-10`}>
        <Icon size={20} className={iconColor} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 relative z-10">
        <p className={`m-0 font-semibold text-sm ${textColor}`}>{message}</p>
        {subText && (
          <p className={`m-0 text-xs mt-1 ${subTextColor}`}>{subText}</p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => onClose(id)}
        className="shrink-0 p-1 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50 relative z-10 group"
        aria-label="Close notification"
      >
        <FaTimes
          size={16}
          className="text-gray-500 group-hover:text-gray-300 transition-colors"
        />
      </button>

      {/* Progress bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 z-10">
          <div
            className={`h-full ${progressColor} transition-all duration-1000 ease-linear`}
            style={{
              width: "100%",
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
