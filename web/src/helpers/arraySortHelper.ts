// src/helpers/arraySortHelper.ts

export function sortByKey<T, K extends keyof T >(
  array: T[],
  key: K,
  ascending: boolean = true, 
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return ascending ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    if (aStr < bStr) return ascending ? -1 : 1;
    if (aStr > bStr) return ascending ? 1 : -1;
    return 0;
  });
};



