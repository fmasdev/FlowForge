// src/components/searchBar/SearchBar.types.ts

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  onSearch: (value: string) => void;
}
