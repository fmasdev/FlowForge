// src/components/searchBar/SearchBar.tsx

import React, { useState } from "react";
import styles from './SearchBar.module.css'
import { SvgIcon } from "@/components/SvgIcon";
import { useTranslation } from "react-i18next";

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  initialValue = "",
  onSearch,
}) => {
  const { t } = useTranslation('common')

  const [value, setValue] = useState(initialValue);
  
  const searchPlaceholder = placeholder ? placeholder : t('searchBar.placeholder')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
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
          onChange={(e) => setValue(e.target.value)}
          placeholder={searchPlaceholder}
          className={styles.input}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.resetBtn}
            aria-label="Clear"
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
