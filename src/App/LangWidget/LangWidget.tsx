import styles from './LangWidget.module.scss';
import { Button } from '~/ui/Button';
import { useAppTranslation } from '~/i18n/useAppTranslation';

export function LangWidget() {
  const { t, i18n } = useAppTranslation();

  const changeLanguage = () => {
    const lang = i18n.language;
    if (lang === 'ru') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };

  return (
    <Button className={styles.LangWidget} onClick={() => changeLanguage()}>
      {t('lang')}
    </Button>
  );
}
