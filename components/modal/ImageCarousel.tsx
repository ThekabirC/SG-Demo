'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 4;

  // Placeholder images (solar panels)
  const images = [
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&h=400&fit=crop',
  ];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-400 to-pink-300">
        <img
          src={images[currentIndex]}
          alt={`Solar panel ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
      >
        <ChevronLeft size={18} className="text-gray-700" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md hover:bg-primary-dark transition-colors"
      >
        <ChevronRight size={18} className="text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
