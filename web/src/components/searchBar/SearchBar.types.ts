// src/components/searchBar/SearchBar.types.ts

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  clearLabel: string;
  searchCharMin?: number;
  onSearch: (value: string) => void;
}
