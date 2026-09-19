import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface LightboxImage {
  url: string;
  roomType?: string;
  projectTitle?: string;
  projectSlug?: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  currentIndex?: number;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
  onSelectProject?: (slug: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex: controlledIndex,
  initialIndex = 0,
  isOpen,
  onClose,
  onNavigate,
  onSelectProject
}) => {
  const [internalIndex, setInternalIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const currentImage = images[activeIndex];

  const handleIndexChange = useCallback((newIndex: number) => {
    if (onNavigate) {
      onNavigate(newIndex);
    }
    setInternalIndex(newIndex);
  }, [onNavigate]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    const prev = (activeIndex - 1 + images.length) % images.length;
    handleIndexChange(prev);
  }, [activeIndex, images.length, handleIndexChange]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    const next = (activeIndex + 1) % images.length;
    handleIndexChange(next);
  }, [activeIndex, images.length, handleIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="lightbox-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#141210]/95 backdrop-blur-md p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Top bar controls */}
        <div 
          className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-[#FAF8F5] z-10 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-0.5">
            {currentImage.roomType && (
              <span className="text-xs uppercase tracking-[0.2em] text-[#C59B6D] font-medium block">
                {currentImage.roomType}
              </span>
            )}
            {currentImage.projectTitle && (
              <h3 className="font-serif text-lg sm:text-xl text-[#FAF8F5]">
                {currentImage.projectTitle}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest text-[#D6CEBE]">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              id="lightbox-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main image container */}
        <div 
          className="relative max-w-6xl max-h-[82vh] w-full flex items-center justify-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            src={currentImage.url}
            alt={currentImage.roomType ? `${currentImage.projectTitle || 'Interior'} - ${currentImage.roomType}` : 'Interior view'}
            className="max-h-[80vh] max-w-full object-contain rounded-xs shadow-2xl select-none"
          />

          {/* Prev / Next Chevrons */}
          {images.length > 1 && (
            <>
              <button
                id="lightbox-prev-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1C1917]/80 hover:bg-[#1C1917] text-[#FAF8F5] transition-all border border-white/10 shadow-lg cursor-pointer hover:scale-105"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                id="lightbox-next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1C1917]/80 hover:bg-[#1C1917] text-[#FAF8F5] transition-all border border-white/10 shadow-lg cursor-pointer hover:scale-105"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom thumbnail & project redirect strip */}
        <div 
          className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-2 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {currentImage.projectSlug && onSelectProject && (
            <button
              onClick={() => {
                onClose();
                onSelectProject(currentImage.projectSlug!);
              }}
              className="text-xs uppercase tracking-widest text-[#C59B6D] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              Explore this project commission →
            </button>
          )}
          <p className="text-[11px] text-[#A8A29E] tracking-wider hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded-xs text-[10px]">ESC</kbd> to close • <kbd className="px-1.5 py-0.5 bg-white/10 rounded-xs text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded-xs text-[10px]">→</kbd> to navigate
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
