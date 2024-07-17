import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import styles from './StatusChart.module.scss';
import { useAppTranslation } from '~/i18n/useAppTranslation';

interface TasksData {
  issuesDone: number;
  issuesNew: number;
  issuesInProgress: number;
}

interface StatusChartProps {
  tasksData: TasksData;
}

const COLORS = ['green', 'red', 'teal'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  value: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export function StatusChart({ tasksData }: StatusChartProps) {
  const { t } = useAppTranslation();
  const view = [
    { name: t('Tasks_StatusChart_taskDone'), value: tasksData.issuesDone },
    { name: t('Tasks_StatusChart_taskInProgress'), value: tasksData.issuesInProgress },
    { name: t('Tasks_StatusChart_taskNew'), value: tasksData.issuesNew },
  ];

  return (
    <div>
      <div className={styles.title}>{t('Tasks_StatusChart_title')}</div>
      <div className={styles.StatusChart}>
        <PieChart width={370} height={500}>
          <Pie
            data={view}
            labelLine={false}
            outerRadius={180}
            fill="#8884d8"
            strokeWidth={1}
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {view.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            wrapperStyle={{
              padding: '10px',
              borderRadius: '10px',
              width: '100%',
              fontSize: '16px',
            }}
          />
          <Label />
        </PieChart>
      </div>
    </div>
  );
}
