import { LangWidget } from '../LangWidget';
import { ThemeWidget } from '../ThemeWidget';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.Header}>
      <ThemeWidget />
      <LangWidget />
    </header>
  );
}
