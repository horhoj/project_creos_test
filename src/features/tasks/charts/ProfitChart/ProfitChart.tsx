import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import { WeekResultsItem } from '../../types';
import styles from './ProfitChart.module.scss';
import { useAppTranslation } from '~/i18n/useAppTranslation';
import { Select, SelectOption } from '~/ui/Select';

const CustomTooltip = ({ active, payload }: any) => {
  const { t } = useAppTranslation();
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltipWrapper}>
        <div>
          {t('Tasks_ProfitChart_week')}: {new Date(payload[0].payload.startOfWeek).toLocaleDateString()}
          {' - '}
          {new Date(payload[0].payload.endOfWeek).toLocaleDateString()}
        </div>
        <div>
          {t('Tasks_ProfitChart_legend_income')}: {payload[0].value.toLocaleString()}
        </div>
        <div>
          {t('Tasks_ProfitChart_legend_profit')}: {payload[1].value.toLocaleString()}
        </div>
        <div>
          {t('Tasks_ProfitChart_legend_expenses')}: {payload[2].value.toLocaleString()}
        </div>
      </div>
    );
  }
};

interface ProfitChartProps {
  profitData: WeekResultsItem[];
  weeks: number;
  setWeeks: (weeks: number) => void;
}

export function ProfitChart({ profitData, weeks, setWeeks }: ProfitChartProps) {
  const { t } = useAppTranslation();

  const formatter = (value: string) => {
    if (value === 'income') {
      return t('Tasks_ProfitChart_legend_income');
    }
    if (value === 'profit') {
      return t('Tasks_ProfitChart_legend_profit');
    }
    if (value === 'expenses') {
      return t('Tasks_ProfitChart_legend_expenses');
    }

    return value;
  };

  const WeekSelectOption: SelectOption[] = useMemo<SelectOption[]>(
    () =>
      Array(19)
        .fill(null)
        .map((_, index) => ({ label: (index + 2).toString(), value: (index + 2).toString() })),
    [],
  );

  return (
    <div className={styles.ProfitChart}>
      <div className={styles.title}>
        {t('Tasks_ProfitChart_title')}
        {':'}
        <Select
          options={WeekSelectOption}
          value={weeks}
          onChange={(e) => setWeeks(+e.target.value)}
          isEmptyValue={false}
        />
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.chart}>
          <BarChart
            width={1024}
            height={350}
            data={profitData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={formatter} />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="profit" fill="#82ca9d" />
            <Bar dataKey="expenses" fill="red" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
