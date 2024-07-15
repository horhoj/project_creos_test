import { useEffect } from 'react';
import { mainSlice } from '../mainSlice';
// import styles from './MainPage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { DefaultLayout } from '~/ui/DefaultLayout';
import { LastComments } from '~/features/LastComments';

export function MainPage() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(mainSlice.selectors.mainIsLoading);
  const lastComments = useAppSelector((state) => state.main.fetchCommentsRequest.data);

  useEffect(() => {
    dispatch(mainSlice.thunks.fetchCommentsThunk());
    return () => {
      dispatch(mainSlice.actions.clear());
    };
  }, []);

  return (
    <DefaultLayout isLoading={isLoading}>{lastComments && <LastComments commentList={lastComments} />}</DefaultLayout>
  );
}
