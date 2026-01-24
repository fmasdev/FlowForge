// src/components/searchBar/SearchBar.tsx

import React, { useState } from "react";
import styles from './SearchBar.module.css'
import { SvgIcon } from "@/components/SvgIcon";

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  initialValue = "",
  clearLabel,
  onSearch,
}: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);

  const handleClear = () => {
    setValue("");
    onSearch("");
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
          onChange={(e) => onSearch(e.target.value)}
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
