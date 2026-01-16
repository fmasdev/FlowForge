import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frCommon from './locales/fr/common.json';
import frAuth from './locales/fr/auth.json';
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    resources: {
      fr: {
        common: frCommon,
        auth: frAuth,
      },
      en: {
        common: enCommon,
        auth: enAuth,
      },
    },
  });

export default i18n;