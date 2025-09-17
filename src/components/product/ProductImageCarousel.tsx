import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types/product';

const ProductImageCarousel = ({ product  }: { product: Product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Get all available images
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail].filter(Boolean);

  // Auto-advance images every 4 seconds
useEffect(() => {
  let interval: NodeJS.Timeout | undefined;

  if (allImages.length > 1 && !isPaused) {
    interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 4000);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [allImages.length, isPaused]);


  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault(); 
    e.stopPropagation()
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {  
     e.preventDefault();  
    e.stopPropagation()
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToImage = (index : number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (allImages.length === 0) {
    return (
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div className="relative h-48 bg-gray-200 overflow-hidden group"
     onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        {allImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 scale-100' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-full scale-95'
                  : 'opacity-0 translate-x-full scale-95'
            }`}
          >
            <Image
              src={image}
              alt={`${product.title} - Image ${index + 1}`}
              fill
              className="object-contain hover:scale-105 transition-transform duration-300"
            //   onError={(e) => {
            //     const target = e.target;
            //     target.src = `https://via.placeholder.com/300x192/f3f4f6/6b7280?text=${encodeURIComponent(product.title || 'Product')}`;
            //   }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {allImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            disabled={isAnimating}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md disabled:opacity-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={nextImage}
            disabled={isAnimating}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md disabled:opacity-50"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if multiple images */}
      {allImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              disabled={isAnimating}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {/* {allImages.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {currentIndex + 1} / {allImages.length}
        </div>
      )} */}
    </div>
  );
};

export default ProductImageCarousel;