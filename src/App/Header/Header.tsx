import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { getISOWeek } from 'date-fns';
import { LangWidget } from '../LangWidget';
import { ThemeWidget } from '../ThemeWidget';
import styles from './Header.module.scss';
import { routes } from '~/router/routes';
import { useAppTranslation } from '~/i18n/useAppTranslation';

const HOURS_OFFSET_FOR_WORKWEEK = -11;

export function Header() {
  const { t } = useAppTranslation();
  const currentWorkWeek = getISOWeek(new Date().getTime() - HOURS_OFFSET_FOR_WORKWEEK * 3600 * 1000);

  return (
    <>
      <header className={styles.Header}>
        <nav className={styles.container}>
          <NavLink
            to={routes.MAIN}
            className={({ isActive }) => classNames(styles.navLink, isActive && styles.navLinkActive)}
          >
            {t('Header_nav_main')}
          </NavLink>
          <NavLink
            to={routes.TASKS}
            className={({ isActive }) => classNames(styles.navLink, isActive && styles.navLinkActive)}
          >
            {t('Header_nav_tasks')}
          </NavLink>
          <NavLink
            to={routes.DESIGNERS}
            className={({ isActive }) => classNames(styles.navLink, isActive && styles.navLinkActive)}
          >
            {t('Header_nav_designers')}
          </NavLink>
        </nav>

        <div className={styles.container}>
          <ThemeWidget />
          <LangWidget />
        </div>
      </header>
      <div className={styles.currentWorkWeek}>
        {t('Header_current_work_week_label')}: {currentWorkWeek}
      </div>
    </>
  );
}
