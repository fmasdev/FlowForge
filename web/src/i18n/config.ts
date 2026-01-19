// src/i18n/config.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import frAuth from './locales/fr/auth.json';
import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';

export const resources = {
  en: {
    auth: enAuth,
    common: enCommon,
    home: enHome,
  },
  fr: {
    auth: frAuth,
    common: frCommon,
    home: frHome,
  },
} as const;

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;