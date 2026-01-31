// src/components/infiniteScroll/InfiniteScroll.types.ts

export interface InfiniteObserverProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number;
}
