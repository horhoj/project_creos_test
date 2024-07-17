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
  isEmptyValue?: boolean;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ isEmptyValue = true, options, ...props }, ref) => {
  const optionList = useMemo(() => {
    if (isEmptyValue) {
      return [{ value: '', label: '', id: getUUID() }, ...options.map((el) => ({ ...el, id: getUUID() }))];
    }

    return options.map((el) => ({ ...el, id: getUUID() }));
  }, [options, isEmptyValue]);
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
