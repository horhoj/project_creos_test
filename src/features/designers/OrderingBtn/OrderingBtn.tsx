import { OrderingType } from '../types';
import styles from './OrderingBtn.module.scss';
import { ArrowDownIcon, ArrowUpIcon } from '~/assets/icons';
import { Button } from '~/ui/Button';

interface OrderingBtnProps {
  field: string;
  ordering: OrderingType | null;
  setOrdering: (type: OrderingType | null) => void;
  title: string;
  disabled: boolean;
}
export function OrderingBtn({ ordering, field, setOrdering, title, disabled }: OrderingBtnProps) {
  const handleOrdering = () => {
    if (ordering?.sortField !== field) {
      setOrdering({ sortField: field, type: '' });
      return;
    }

    if (ordering?.sortField === field && ordering.type === '') {
      setOrdering({ sortField: field, type: '-' });
      return;
    }

    if (ordering?.sortField === field && ordering.type === '-') {
      setOrdering(null);
    }
  };

  return (
    <Button className={styles.OrderingBtn} onClick={handleOrdering} disabled={disabled}>
      {title}
      {ordering?.sortField === field && ordering.type === '' && (
        <span>
          <ArrowUpIcon />
        </span>
      )}
      {ordering?.sortField === field && ordering.type === '-' && (
        <span className={styles.arrowDown}>
          <ArrowDownIcon />
        </span>
      )}
    </Button>
  );
}
