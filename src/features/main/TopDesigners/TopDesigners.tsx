import { TopDesignerItem } from '../types';
import styles from './TopDesigners.module.scss';
import { makeAvatarPath } from '~/api/const';
import { useAppTranslation } from '~/i18n/useAppTranslation';

interface TopDesignersProps {
  topDesigners: TopDesignerItem[];
}

const getTimeIsLeft = (unixTime: number) => {
  const timeInMilliseconds = unixTime;

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

export function TopDesigners({ topDesigners }: TopDesignersProps) {
  const { t } = useAppTranslation();

  return (
    <div className={styles.TopDesigners}>
      <div className={styles.title}>{t('Main_TopDesigners_title')}</div>
      <ul className={styles.list}>
        {topDesigners.map((el) => {
          const timeLeft = getTimeIsLeft(new Date(el.time).getTime());
          return (
            <li key={el.id} className={styles.listItem}>
              <img src={makeAvatarPath(el.designer)} alt={'avatar'} className={styles.avatar} />
              <div className={styles.listDataElement}>
                <strong>{el.designer}</strong>
              </div>
              <div className={styles.flexNoWrap}>
                <strong>{t('Main_TopDesigners_taskCount')}: </strong>
                {el.taskCount}
              </div>
              <div className={styles.flexWrap}>
                <strong>{t('Main_TopDesigners_taskTimeLeft')}:</strong>{' '}
                <span className={styles.flexNoWrap}>
                  {t('Main_days')}: {timeLeft?.d}, {t('Main_hours')}: {timeLeft?.h}, {t('Main_minutes')}: {timeLeft?.m}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
