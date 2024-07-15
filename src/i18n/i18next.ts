// /src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // default import from /public/locales/[lang]/[namespace].json
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Our default language
    debug: false, // Only use this in dev mode
    interpolation: {
      escapeValue: false, // We don't need this for React
    },
  });

export default i18n;

export type Lang = 'ru' | 'en';
