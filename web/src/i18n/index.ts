// src/i18n/index.ts

import i18n from 'i18next';
import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import frAuth from './locales/fr/auth.json';
import frCommon from './locales/fr/common.json';

export const resources = {
  en: { 
    auth: enAuth, 
    common: enCommon 
  },
  fr: { 
    auth: frAuth, 
    common: frCommon 
  }
};

export default i18n;