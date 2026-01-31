// src/components/infinite-scroll/InfiniteObserver.tsx

'use client';

import { InfiniteObserverProps } from '@/components/infinite-scroll/InfiniteObserver.types';
import { useEffect, useRef } from 'react';

export const InfiniteObserver: React.FC<InfiniteObserverProps> = ({
  onLoadMore,
  hasMore,
  isLoading,
  rootMargin = '200px',
  threshold = 0,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore, rootMargin, threshold]);

  return <div ref={ref} className="h-px w-full" />;
};