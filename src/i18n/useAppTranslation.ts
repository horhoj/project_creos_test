import { useTranslation } from 'react-i18next';
import translate from '~/public/locales/en/translation.json';

type TranslateKeys = keyof typeof translate;

export const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  const tX = (key: TranslateKeys) => t(key);

  return { t: tX, i18n };
};
