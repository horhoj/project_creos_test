import { useEffect, useState } from 'react';
import styles from './CommentTime.module.scss';
import { useAppTranslation } from '~/i18n/useAppTranslation';

interface CommentTimeProps {
  date: string;
}

const getTimeIsLeft = (unixTime: number | null) => {
  if (unixTime === null) {
    return null;
  }
  const currentTime = new Date().getTime();
  const timeInMilliseconds = currentTime - unixTime;

  interface Step {
    label: string;
    units: number;
    done: boolean;
  }

  const stepList = [
    { label: 'ms', units: 1000, done: false },
    { label: 's', units: 60, done: false },
    { label: 'm', units: 60, done: false },
    { label: 'h', units: 24, done: false },
    { label: 'd', units: 1, done: true },
  ] as const satisfies Step[];

  type Data = (typeof stepList)[number]['label'];

  let currentOct = timeInMilliseconds;
  const data = {} as Record<Data, number>;

  stepList.forEach((step) => {
    const oct = currentOct % step.units;
    currentOct = (currentOct - oct) / step.units;
    if (step.done) {
      data[step.label] = currentOct;
    } else {
      data[step.label] = oct;
    }
  });

  return data;
};

export function CommentTime({ date }: CommentTimeProps) {
  const timeLeft = getTimeIsLeft(new Date(date).getTime());

  const { t } = useAppTranslation();

  const [_, setRerenderCounter] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRerenderCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <span className={styles.CommentTime}>
      {t('Main_CommentTime_days')}: {timeLeft?.d}, {t('Main_CommentTime_hours')}: {timeLeft?.h},{' '}
      {t('Main_CommentTime_minutes')}: {timeLeft?.m}
    </span>
  );
}
