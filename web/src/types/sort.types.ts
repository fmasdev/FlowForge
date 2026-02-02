// src/types/sort.types.ts

export type SortDirection = 'asc' | 'desc';

export interface SortState<T> {
  field: keyof T;
  direction: SortDirection;
}