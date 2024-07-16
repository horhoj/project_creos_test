import { forwardRef, SelectHTMLAttributes, useMemo } from 'react';
import styles from './Select.module.scss';
import { getUUID } from '~/utils/getUUID';

// Select component
export interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ options, ...props }, ref) => {
  const optionList = useMemo(
    () => [{ value: '', label: '', id: getUUID() }, ...options.map((el) => ({ ...el, id: getUUID() }))],
    [options],
  );
  return (
    <select {...props} ref={ref} className={styles.Select}>
      {optionList.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});
Select.displayName = 'Select';
