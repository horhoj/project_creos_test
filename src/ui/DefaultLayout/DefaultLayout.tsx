import { Spinner } from '../Spinner';
import styles from './DefaultLayout.module.scss';

interface DefaultLayoutProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}
export function DefaultLayout({ children, isLoading = false }: DefaultLayoutProps) {
  return (
    <>
      <Spinner isShow={isLoading} />
      <main className={styles.DefaultLayout}>{children}</main>
    </>
  );
}
