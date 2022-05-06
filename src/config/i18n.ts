// ** I18n Imports
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n

  // Enables the i18next backend
  .use(Backend)
  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    backend: {
      /* translation file path */
      loadPath: '/assets/data/locales/{{lng}}.json',
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      // Turn off the use of React Suspense
      useSuspense: false,
    },
  });

export default i18n;
