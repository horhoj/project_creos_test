import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { MainPage } from '~/features/main/MainPage';

export function Router() {
  return (
    <>
      <Routes>
        <Route path={routes.MAIN} element={<MainPage />} />

        <Route path={'*'} element={<Navigate to={routes.MAIN} replace={true} />} />
      </Routes>
    </>
  );
}
