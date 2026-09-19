import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getPublishedTestimonials } from '../lib/queries';
import { Testimonial } from '../types';

export const TestimonialsCarousel: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadTestimonials() {
      try {
        const data = await getPublishedTestimonials();
        if (isMounted && data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (e) {
        console.warn('Failed loading testimonials', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadTestimonials();
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Auto advance every 8 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs uppercase tracking-widest text-[#78716C] animate-pulse">
        Loading Reflections...
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <div id="testimonials-carousel" className="relative max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Quote className="w-10 h-10 mx-auto text-[#C59B6D]/40 mb-3" />
        <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
          Client Reflections
        </span>
      </div>

      <div className="min-h-[220px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="text-center space-y-6"
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1C1917] leading-relaxed italic max-w-3xl mx-auto">
              "{current.quote}"
            </p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-1 text-[#C59B6D]">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C59B6D] text-[#C59B6D]" />
                ))}
              </div>
              <h4 className="font-medium text-[#1C1917] text-base tracking-wide">
                {current.clientName}
              </h4>
              <p className="text-xs uppercase tracking-widest text-[#78716C]">
                {current.project} • {current.location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel navigation controls */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            id="testimonial-prev-btn"
            onClick={handlePrev}
            className="p-2 rounded-full border border-[#D6CEBE] text-[#78716C] hover:text-[#1C1917] hover:border-[#1C1917] transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-[#9E6938]' : 'w-2 bg-[#D6CEBE]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            id="testimonial-next-btn"
            onClick={handleNext}
            className="p-2 rounded-full border border-[#D6CEBE] text-[#78716C] hover:text-[#1C1917] hover:border-[#1C1917] transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
