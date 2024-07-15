import { useEffect } from 'react';
import { mainSlice } from '../mainSlice';
// import styles from './MainPage.module.scss';
import { TopDesigners } from '../TopDesigners';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { DefaultLayout } from '~/ui/DefaultLayout';
import { LastComments } from '~/features/main/LastComments';

export function MainPage() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(mainSlice.selectors.mainIsLoading);
  const lastComments = useAppSelector((state) => state.main.fetchCommentsRequest.data);
  // const x = useAppSelector(mainTopDesignerSelector);
  const topDesigners = useAppSelector((state) => state.main.fetchIssuesRequest.data);

  useEffect(() => {
    dispatch(mainSlice.thunks.fetchCommentsThunk());
    dispatch(mainSlice.thunks.fetchIssuesThunk());
    return () => {
      dispatch(mainSlice.actions.clear());
    };
  }, []);

  return (
    <DefaultLayout isLoading={isLoading}>
      {topDesigners && <TopDesigners topDesigners={topDesigners} />}{' '}
      {lastComments && <LastComments commentList={lastComments} />}
    </DefaultLayout>
  );
}
