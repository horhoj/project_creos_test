// import styles from './TasksPage.module.scss';
import { useEffect } from 'react';
import { tasksSlice, tasksSliceProfitSelector, tasksSliceTasksDataSelector } from '../tasksSlice';
import { StatusChart } from '../charts/StatusChart';
import { ProfitChart } from '../charts/ProfitChart';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { DefaultLayout } from '~/ui/DefaultLayout';

export function TasksPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksSlice.thunks.fetchIssuesThunk());
    return () => {
      dispatch(tasksSlice.actions.clear());
    };
  }, []);

  const tasksData = useAppSelector(tasksSliceTasksDataSelector);
  const weeks = useAppSelector((state) => state.tasks.weeks);
  const profitData = useAppSelector(tasksSliceProfitSelector);

  // console.log(JSON.stringify(profitData, null, 2));

  const handleSetWeeks = (weeks: number) => {
    dispatch(tasksSlice.actions.setWeeks(weeks));
  };

  return (
    <DefaultLayout>
      <div>
        {profitData && <ProfitChart profitData={profitData} weeks={weeks} setWeeks={handleSetWeeks} />}
        {/* <DevView data={profitData} title={'asdsa'} /> */}
      </div>
      <div>{tasksData && <StatusChart tasksData={tasksData} />}</div>
    </DefaultLayout>
  );
}
