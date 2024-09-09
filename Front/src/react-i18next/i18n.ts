import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales/resources';
import LanguageDetector from 'i18next-browser-languagedetector';

const currentLocale = localStorage.getItem('lan') || navigator.language;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: currentLocale,
        fallbackLng: currentLocale, 
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        detection: {
            caches: ['localStorage', 'sessionStorage', 'cookie'],
        }
    });


export default i18n;
