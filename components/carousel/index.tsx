'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Image } from '@heroui/image';

interface CarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, isDragging]);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const preloadImages = [
      images[(currentIndex + 1) % images.length].src,
      images[(currentIndex - 1 + images.length) % images.length].src
    ];
    
    preloadImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [currentIndex, images]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className="flex w-full h-full"
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        initial={false}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 items-center justify-center w-full flex justify-center items-center ${index !== currentIndex ? 'hidden' : ''}`}
            style={{ position: 'relative' }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="object-cover w-[640px] h-[320px]"
            />
          </div>
        ))}
      </motion.div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}