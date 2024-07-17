// import styles from './TasksPage.module.scss';
import { useEffect } from 'react';
import { tasksSlice, tasksSliceTasksDataSelector } from '../tasksSlice';
import { StatusChart } from '../charts/StatusChart';
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

  return (
    <DefaultLayout>
      <div>{tasksData && <StatusChart tasksData={tasksData} />}</div>
    </DefaultLayout>
  );
}
