import { useEffect } from 'react';
import styles from './ThemeWidget.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { settingsSlice } from '~/store/settingsSlice';
import { Button } from '~/ui/Button';
import { useAppTranslation } from '~/i18n/useAppTranslation';

export function ThemeWidget() {
  const isDark = useAppSelector((state) => state.settings.isDark);
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation();

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const handleIsDarkToggle = () => {
    dispatch(settingsSlice.actions.isDarkToggle());
  };

  return (
    <Button className={styles.ThemeWidget} onClick={handleIsDarkToggle}>
      {isDark ? t('darkTheme') : t('lightTheme')}
    </Button>
  );
}
