import { useEffect } from 'react';
import { designerSlice } from '../designerSlice';
import { DesignersTable } from '../DesignersTable';
import { Paginator } from '../Paginator';
import { OrderingType, PaginationType } from '../types';
import { DesignerFilters } from '../DesignerFilters';
// import styles from './DesignerPage.module.scss';
import { DefaultLayout } from '~/ui/DefaultLayout';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function DesignerPage() {
  const dispatch = useAppDispatch();

  const designerList = useAppSelector((state) => state.designer.fetchDesignerListRequest.data);
  const page = useAppSelector((state) => state.designer.page);
  const isLoading = useAppSelector(designerSlice.selectors.isLoading);
  const projectList = useAppSelector((state) => state.designer.fetchProjectListRequest.data);
  const designersPageCount = useAppSelector(designerSlice.selectors.designersPageCount);
  const ordering = useAppSelector((state) => state.designer.ordering);

  useEffect(() => {
    dispatch(designerSlice.thunks.fetchDesignerListThunk({ paginationType: 'current' }));
    dispatch(designerSlice.thunks.fetchProjectListThunk());

    return () => {
      dispatch(designerSlice.actions.clear());
    };
  }, []);

  const handlePagination = (paginationType: PaginationType) => {
    dispatch(designerSlice.thunks.fetchDesignerListThunk({ paginationType }));
  };

  const handleFiltersSubmit = (project: string, status: string) => {
    dispatch(
      designerSlice.thunks.fetchDesignerListThunk({
        paginationType: 'current',
        projectValue: project,
        statusValue: status,
      }),
    );
  };

  const handleFiltersReset = () => {
    dispatch(
      designerSlice.thunks.fetchDesignerListThunk({
        paginationType: 'current',
        projectValue: '',
        statusValue: '',
      }),
    );
  };

  const handleSetOrdering = (type: OrderingType | null) => {
    dispatch(
      designerSlice.thunks.fetchDesignerListThunk({
        paginationType: 'current',
        orderingValue: type,
      }),
    );
  };

  return (
    <DefaultLayout isLoading={isLoading}>
      {projectList && (
        <DesignerFilters
          projectList={projectList}
          onSubmit={handleFiltersSubmit}
          onReset={handleFiltersReset}
          disabled={isLoading}
        />
      )}
      {designerList && (
        <>
          <DesignersTable
            designerList={designerList.results}
            ordering={ordering}
            setOrdering={handleSetOrdering}
            disabled={isLoading}
          />
          <Paginator onChange={handlePagination} page={page} disabled={isLoading} pageCount={designersPageCount} />
        </>
      )}
    </DefaultLayout>
  );
}
