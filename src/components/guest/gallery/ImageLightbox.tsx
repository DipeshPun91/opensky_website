// components/guest/gallery/ImageLightbox.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ImageLightboxProps {
  imageUrl: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  imageUrl,
  caption,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] mx-4"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close lightbox"
            >
              <IoClose size={32} />
            </button>

            <div className="relative w-full h-[80vh]">
              <Image
                src={imageUrl}
                alt={caption || "Gallery image"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            {caption && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-12 left-0 right-0 text-center text-white/80 text-sm sm:text-base"
              >
                {caption}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
