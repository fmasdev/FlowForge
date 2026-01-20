// src/i18n/config.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enNavigation from './locales/en/navigation.json';
import frAuth from './locales/fr/auth.json';
import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frNavigation from './locales/fr/navigation.json';

type TranslationNamespaces = {
  auth: typeof enAuth | typeof frAuth;
  common: typeof enCommon | typeof frCommon;
  home: typeof enHome | typeof frHome;
  navigation: typeof enNavigation | typeof frNavigation;
};

export type Locale = 'en' | 'fr';
export const LANGUAGES: readonly Locale[] = ['en', 'fr'] as const;

export const resources: Record<'en' | 'fr', TranslationNamespaces> = {
  en: {
    auth: enAuth,
    common: enCommon,
    home: enHome,
    navigation: enNavigation,
  },
  fr: {
    auth: frAuth,
    common: frCommon,
    home: frHome,
    navigation: frNavigation,
  },
};

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