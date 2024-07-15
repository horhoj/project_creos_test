import styles from './App.module.scss';
import { Header } from './Header';
import { Router } from '~/router/Router';

export function App() {
  return (
    <>
      <div className={styles.App}>
        <Header />
        <Router />
      </div>
    </>
  );
}
