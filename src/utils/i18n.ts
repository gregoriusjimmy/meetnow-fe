import enableLocationLocale from '@features/enable-location/locale.json';
import loginLocale from '@features/login/locale.json';
import signUpLocale from '@features/sign-up/locale.json';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.

function traverseLocales() {
  const translations = { en: {}, id: {} };
  [enableLocationLocale, loginLocale, signUpLocale].forEach((locale) => {
    translations.en = { ...translations.en, ...locale.en };
    translations.id = { ...translations.id, ...locale.id };
  });
  return translations;
}

const translations = traverseLocales();

export const i18n = new I18n(translations);
