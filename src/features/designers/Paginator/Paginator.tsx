import { PaginationType } from '../types';
import styles from './Paginator.module.scss';
import { Button } from '~/ui/Button';

interface PaginatorProps {
  onChange: (paginationType: PaginationType) => void;
  page: number;
  pageCount: number;
  disabled: boolean;
}
export function Paginator({ onChange, page, disabled, pageCount }: PaginatorProps) {
  return (
    <div className={styles.Paginator}>
      <Button className={styles.btn} onClick={() => onChange('first')} disabled={disabled}>
        {'<<'}
      </Button>
      <Button className={styles.btn} onClick={() => onChange('prev')} disabled={disabled}>
        {'<'}
      </Button>
      <div className={styles.page}>
        {page}
        {' - '}
        {pageCount}
      </div>
      <Button className={styles.btn} onClick={() => onChange('next')} disabled={disabled}>
        {'>'}
      </Button>
      <Button className={styles.btn} onClick={() => onChange('last')} disabled={disabled}>
        {'>>'}
      </Button>
    </div>
  );
}
