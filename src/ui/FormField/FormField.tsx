import styles from './FormField.module.scss';

interface FormFieldProps {
  children?: React.ReactNode;
  title: string;
}

export function FormField({ children, title }: FormFieldProps) {
  return (
    <div className={styles.FormField}>
      <div className={styles.title}>{title}</div>
      <div>{children}</div>
    </div>
  );
}
