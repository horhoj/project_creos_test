import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderingType, PaginationType } from './types';
import { getApiErrors } from '~/api/common';
import { designersApi } from '~/api/designer';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';
import { RootState } from '~/store/types';
import { FetchDesignerResponse } from '~/api/designer.types';
import { projectsApi } from '~/api/projects';
import { FetchProjectListResponseItem } from '~/api/projects.types';

const SLICE_NAME = 'designer';
const LIMIT = 8;

interface IS {
  fetchDesignerListRequest: RequestStateProperty<FetchDesignerResponse>;
  fetchProjectListRequest: RequestStateProperty<FetchProjectListResponseItem[]>;
  page: number;
  project: string;
  status: string;
  ordering: OrderingType | null;
}

const initialState: IS = {
  fetchDesignerListRequest: makeRequestStateProperty(),
  fetchProjectListRequest: makeRequestStateProperty(),
  page: 1,
  project: '',
  status: '',
  ordering: null,
};

const { actions, selectors, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setProject: (state, action: PayloadAction<string>) => {
      state.project = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setOrdering: (state, action: PayloadAction<OrderingType | null>) => {
      state.ordering = action.payload;
    },
  },

  selectors: {
    isLoading: (state) => state.fetchDesignerListRequest.isLoading,
    designersPageCount: (state) => Math.ceil((state.fetchDesignerListRequest.data?.count ?? 0) / LIMIT),
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchDesignerListThunk, 'fetchDesignerListRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchProjectListThunk, 'fetchProjectListRequest');
  },
});

interface fetchDesignerListThunkPayload {
  paginationType: PaginationType;
  projectValue?: string;
  statusValue?: string;
  orderingValue?: OrderingType | null;
}

const fetchDesignerListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchDesignerListThunk`,
  async ({ paginationType, projectValue, statusValue, orderingValue }: fetchDesignerListThunkPayload, store) => {
    try {
      let page = (store.getState() as RootState).designer.page;
      const prevRes = (store.getState() as RootState).designer.fetchDesignerListRequest.data;
      const currentProject = (store.getState() as RootState).designer.project;
      const currentStatus = (store.getState() as RootState).designer.status;
      const currentOrdering = (store.getState() as RootState).designer.ordering;

      if (paginationType === 'first') {
        page = 1;
      }

      if (paginationType === 'prev' && prevRes?.previous) {
        page--;
      }

      if (paginationType === 'next' && prevRes?.next) {
        page++;
      }

      if (paginationType === 'last' && prevRes?.count !== undefined && prevRes.count !== 0) {
        page = Math.ceil(prevRes.count / LIMIT);
      }

      if (projectValue !== undefined || statusValue !== undefined) {
        page = 1;
      }

      const project = projectValue !== undefined ? projectValue : currentProject;
      const status = statusValue !== undefined ? statusValue : currentStatus;
      const ordering = orderingValue !== undefined ? orderingValue : currentOrdering;
      let finalOrdering = undefined;
      if (ordering !== null) {
        finalOrdering = ordering.type + ordering.sortField;
      }

      const res = await designersApi.fetchDesigners({
        page,
        limit: LIMIT,
        project,
        status,
        ordering: finalOrdering,
      });

      store.dispatch(actions.setPage(page));
      store.dispatch(actions.setProject(project));
      store.dispatch(actions.setStatus(status));
      store.dispatch(actions.setOrdering(ordering));

      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

const fetchProjectListThunk = createAsyncThunk(`${SLICE_NAME}/fetchProjectListThunk`, async (_, store) => {
  try {
    const res = await projectsApi.fetchProjects();
    return store.fulfillWithValue(res);
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const designerSlice = { actions, selectors, thunks: { fetchDesignerListThunk, fetchProjectListThunk } } as const;

export const designerReducer = reducer;
