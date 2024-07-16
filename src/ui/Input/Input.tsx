import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input {...props} className={classNames(styles.Input, className)} ref={ref} />;
});

Input.displayName = 'Input';
