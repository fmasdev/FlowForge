// src/components/searchBar/SearchBar.types.ts

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  clearLabel: string;
  onSearch: (value: string) => void;
}
