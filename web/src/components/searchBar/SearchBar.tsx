// src/components/searchBar/SearchBar.tsx

'use client';

import React, { useState } from "react";
import styles from './SearchBar.module.css'
import { SvgIcon } from "@/components/SvgIcon";

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  initialValue = '',
  clearLabel,
  searchCharMin = 2,
  onClearSearch,
  onSearch,
}: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value
    setValue(val)

    if (searchCharMin < val.length) {
      onSearch(val.trim());
    }

    if (val.length === 0) {
      onClearSearch();
    }
  };

  const handleClear = (): void => {
    setValue('');
    onSearch('');
    onClearSearch();
  };

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <span className={styles.iconContainer}>
          <SvgIcon
            name="search"
            size="md"
          />
        </span>
        <input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder={placeholder ? placeholder : undefined}
          className={styles.input}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.resetBtn}
            aria-label={clearLabel ? clearLabel : undefined}
          >
            <SvgIcon 
              name="closeCircle"
            />
          </button>
        )}
      </div>
    </form>
  );
};
