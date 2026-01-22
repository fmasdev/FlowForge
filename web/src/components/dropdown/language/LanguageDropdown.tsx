// src/components/dropdown/language/LanguageDropdown.tsx

'use client';

import { SvgIcon } from '@/components/SvgIcon';
import { LANGUAGES, Locale } from '@/i18n/config';
import { JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageDropdown = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLocale = i18n.resolvedLanguage as Locale;

  const changeLanguage = (locale: Locale) => {
    i18n.changeLanguage(locale);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent text-gray-50 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-gray-300 px-4 py-2 text-sm rounded-md"
      >
        <SvgIcon name={currentLocale} classname="h-5 w-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 rounded-md bg-gray-800 py-1"
        >
          {LANGUAGES.map((locale, index) => (
            <button
              key={index}
              onClick={() => changeLanguage(locale)}
              className="flex items-center gap-2 px-4 py-2"
            >
              <SvgIcon name={locale} classname="h-6 w-6" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
