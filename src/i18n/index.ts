import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import heHomePage from "./locales/he/home.json"
import enHomePage from "./locales/en/home.json"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                homePage: enHomePage,

            },
            he: {
                homePage: heHomePage,
            },
        },
        fallbackLng: 'en',
        supportedLngs: ['en', 'he'],
        lng: 'he', // Default language   
        react: {
            useSuspense: false,
        },
    });

export default i18n;
