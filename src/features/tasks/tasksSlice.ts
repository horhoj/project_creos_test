import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getApiErrors } from '~/api/common';
import { issuesApi } from '~/api/issues';
import { IssueResponseItem, IssueStatus } from '~/api/issues.types';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';
import { RootState } from '~/store/types';

const SLICE_NAME = 'tasks';

interface IS {
  fetchIssuesRequest: RequestStateProperty<IssueResponseItem[]>;
  weeks: number;
}

const initialState: IS = {
  fetchIssuesRequest: makeRequestStateProperty(),
  weeks: 8,
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  selectors: {
    isLoading: (state) => state.fetchIssuesRequest.isLoading,
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchIssuesThunk, 'fetchIssuesRequest');
  },
});

const fetchIssuesThunk = createAsyncThunk(`SLICE_NAME/fetchIssuesThunk`, async (_, store) => {
  try {
    const res = await issuesApi.fetchIssues({});

    return store.fulfillWithValue(res);
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const tasksSlice = { actions, selectors, thunks: { fetchIssuesThunk } } as const;

export const tasksReducer = reducer;

export const tasksSliceTasksDataSelector = createSelector(
  (state: RootState) => state.tasks.fetchIssuesRequest.data,
  (issues) => {
    if (issues === null) {
      return null;
    }

    let issuesNew = 0;
    let issuesInProgress = 0;
    let issuesDone = 0;

    issues.forEach((issue) => {
      if (issue.status === IssueStatus.Done) {
        issuesDone++;
        return;
      }

      if (issue.status === IssueStatus.InProgress) {
        issuesInProgress++;
        return;
      }
      if (issue.status === IssueStatus.New) {
        issuesNew++;
      }
    });

    return { issuesDone, issuesNew, issuesInProgress };
  },
);

// export const tasksSliceProfitSelector = createSelector(
//   (state: RootState) => state.tasks.weeks,
//   (state: RootState) => state.tasks.fetchIssuesRequest.data,
//   (weeks, issues) => {
//     if (issues === null) {
//       return null;
//     }

//     // const startCurrentWeek = startOfWeek

//     // const fromDate =

//     return 1;
//   },
// );
