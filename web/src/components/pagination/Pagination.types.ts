// src/components/pagination/Pagination.types.ts

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number
  limit?: number;
  onPageChange: (page: number) => void;
}