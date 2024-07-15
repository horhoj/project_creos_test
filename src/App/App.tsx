import styles from './App.module.scss';
import { Header } from './Header';

export function App() {
  return (
    <>
      <div className={styles.App}>
        <Header />
      </div>
    </>
  );
}
