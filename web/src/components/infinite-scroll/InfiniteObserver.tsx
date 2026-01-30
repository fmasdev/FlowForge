'use client';

import { useEffect, useRef } from 'react';

export interface InfiniteObserverProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const InfiniteObserver: React.FC<InfiniteObserverProps> = ({
  onLoadMore,
  hasMore,
  isLoading,
  rootMargin = '200px', // déclenche AVANT le bas
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