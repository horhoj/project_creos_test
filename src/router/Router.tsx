import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { MainPage } from '~/features/main/MainPage';
import { DesignerPage } from '~/features/designers/DesignerPage';
import { TasksPage } from '~/features/tasks/TasksPage';

export function Router() {
  return (
    <>
      <Routes>
        <Route path={routes.MAIN} element={<MainPage />} />
        <Route path={routes.TASKS} element={<TasksPage />} />
        <Route path={routes.DESIGNERS} element={<DesignerPage />} />

        <Route path={'*'} element={<Navigate to={routes.MAIN} replace={true} />} />
      </Routes>
    </>
  );
}
