// src/components/pagination/Pagination.tsx

import { JSX } from "react";
import { PaginationProps } from "@/components/pagination/Pagination.types";
import { SvgIcon } from "@/components/SvgIcon";
import { useTranslation } from "react-i18next";
import styles from './Pagination.module.css';

const getVisiblePages = (
    current: number,
    total: number
  ): Array<number | "…"> => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, "…", total];
    }

    if (current >= total - 3) {
      return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "…", current - 1, current, current + 1, "…", total];
};

const PaginationArrow = ({
  disabled,
  onClick,
  icon,
  label,
}: {
  disabled: boolean;
  onClick: () => void;
  icon: "arrowLeft" | "arrowRight";
  label: string;
}): JSX.Element => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={styles.paginationArrowBtn}
  >
    <span className="sr-only">
      {label}
    </span>
    <SvgIcon name={icon} size="sm" />
  </button>
);

export const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  limit,
  onPageChange
}: PaginationProps): JSX.Element => {
  console.log({ currentPage, totalItems, pageSize, limit });
  const { t } = useTranslation('common');
  
  const totalPages = Math.ceil(totalItems / pageSize);
  // Current page info
  const from = (currentPage - 1) * pageSize + 1;
  const to = from + pageSize - 1;
  // Helper to determine which page numbers to show
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div
      className={styles.paginationContainer}
    >
      {/* mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <a href="#" className={styles.mobileBtn}>
          Previous
        </a>
        <a href="#"
          className={`${styles.mobileBtn} ${ styles.mobileNextButton}`}>
          Next
        </a>
      </div>

      {/* desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            {t("pagination.display", { start: from, end: to, total: totalItems })}
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md"
          >
            <PaginationArrow
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              icon="arrowLeft"
              label={t("pagination.previous")}
            />
            
            {pages.map((page, index) => {
              if (page === "…") {
                return (<span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 inset-ring inset-ring-gray-700 focus:outline-offset-0">...</span>);
              }
              return (
                <a
                  key={index}
                  href="#"
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`${styles.paginationBtn} ${
                    page === currentPage
                      ? `${styles.paginationCurrentBtn}`
                      : `${styles.paginationBumberBtn}`
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </a>
              );
            })}

            <PaginationArrow
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage + 1)}
              icon="arrowRight"
              label={t("pagination.next")}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};