'use client';

import { useEffect, useRef } from 'react';
import { ensureAbsoluteImageUrl } from './imageLoader';

export function useArticleContentImageFix() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const images = contentRef.current.querySelectorAll('img');
    
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (src) {
        const absoluteSrc = ensureAbsoluteImageUrl(src);
        
        // Set absolute URL
        img.src = absoluteSrc;
        
        // Add loading attributes
        img.loading = 'eager';
        img.decoding = 'async';
        
        // Prevent layout shift
        if (!img.style.maxWidth) {
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        }
        
        // Add error handler
        img.onerror = () => {
          img.src = '/logo.png';
        };
      }
    });
  }, []);

  return contentRef;
}
