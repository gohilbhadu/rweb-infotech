import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLaptopPlaceholder } from '../../lib/assets/placeholders';

const FALLBACK_IMAGES = [
  '/assets/generated/laptop-generic-1.dim_1200x900.png',
  '/assets/generated/laptop-generic-2.dim_1200x900.png',
  '/assets/generated/laptop-generic-3.dim_1200x900.png',
];

interface ImageGalleryProps {
  images?: string[];
  imageUrls?: string[];
  modelName?: string;
  altText?: string;
  altPrefix?: string;
}

export default function ImageGallery({ images, imageUrls, modelName, altText, altPrefix }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorMap, setErrorMap] = useState<Record<number, boolean>>({});

  // Support both prop naming conventions
  const displayImages = FALLBACK_IMAGES;
  const label = altText || altPrefix || modelName || 'Laptop';

  const handleError = (index: number) => {
    setErrorMap((prev) => ({ ...prev, [index]: true }));
  };

  const prev = () => setActiveIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % displayImages.length);

  const currentSrc = errorMap[activeIndex]
    ? getLaptopPlaceholder(activeIndex)
    : displayImages[activeIndex];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden border border-border shadow-card group">
        <img
          key={activeIndex}
          src={currentSrc}
          alt={`${label} - image ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={() => handleError(activeIndex)}
        />

        {displayImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-card hover:bg-card hover:shadow-card-hover transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-card hover:bg-card hover:shadow-card-hover transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}

        {/* Dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {displayImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === activeIndex ? 'bg-primary w-5' : 'w-2 bg-background/60 hover:bg-background/80'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? 'border-primary shadow-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={errorMap[i] ? getLaptopPlaceholder(i) : src}
                alt={`${label} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                onError={() => handleError(i)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
