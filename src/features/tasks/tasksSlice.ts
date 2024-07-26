import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addHours, addWeeks, endOfISOWeek, startOfISOWeek } from 'date-fns';
import { WeekResultsItem } from './types';
import { getApiErrors } from '~/api/common';
import { issuesApi } from '~/api/issues';
import { IssueResponseItem, IssueStatus } from '~/api/issues.types';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';
import { RootState } from '~/store/types';
import { getUUID } from '~/utils/getUUID';
import { getCurrentWorkWeek } from '~/utils/getCurrentWorkWeek';

const SLICE_NAME = 'tasks';

const HOURS_OFFSET_FOR_WORKWEEK = -11;

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
    setWeeks: (state, action: PayloadAction<number>) => {
      state.weeks = action.payload;
    },
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

export const tasksSliceProfitSelector = createSelector(
  (state: RootState) => state.tasks.weeks,
  (state: RootState) => state.tasks.fetchIssuesRequest.data,
  (weekCount, issues) => {
    if (issues === null) {
      return null;
    }
    const currentWorkWeek = getCurrentWorkWeek();
    const startOfWorkWeek = (date: string | Date | number) => startOfISOWeek(date);
    const endOfWorkWeek = (date: string | Date | number) => endOfISOWeek(date);

    const makeDateHash = (date: string | Date | number) =>
      `${startOfWorkWeek(date).toISOString()}___${endOfWorkWeek(date).toISOString()}`;

    const ms: Record<string, WeekResultsItem> = {};

    for (const issue of issues) {
      if (issue.status === IssueStatus.Done && issue.date_finished !== null) {
        const workDateFinished = addHours(
          issue.date_finished,
          HOURS_OFFSET_FOR_WORKWEEK + new Date().getTimezoneOffset() / 60,
        );
        const dateHash = makeDateHash(workDateFinished);

        if (!ms[dateHash]) {
          ms[dateHash] = {
            id: getUUID(),
            expenses: 0,
            income: 0,
            profit: 0,
            issueCount: 0,
            startOfWeek: startOfWorkWeek(workDateFinished).toISOString(),
            endOfWeek: endOfWorkWeek(workDateFinished).toISOString(),
            name: '0',
          };
        }

        ms[dateHash].income += issue.received_from_client;
        ms[dateHash].expenses += issue.send_to_account_manager + issue.send_to_designer + issue.send_to_project_manager;
        ms[dateHash].profit = ms[dateHash].income - ms[dateHash].expenses;
        ms[dateHash].issueCount++;
      }
    }

    let bufferDate = new Date();

    const result: WeekResultsItem[] = [];

    for (let i = 1; i <= weekCount; i++) {
      const currentDateHash = makeDateHash(bufferDate);
      const name = (currentWorkWeek - i + 1).toString();

      if (ms[currentDateHash]) {
        result.unshift({ ...ms[currentDateHash], name });
      } else {
        result.unshift({
          id: getUUID(),
          income: 0,
          expenses: 0,
          profit: 0,
          issueCount: 0,
          startOfWeek: startOfWorkWeek(bufferDate).toISOString(),
          endOfWeek: endOfWorkWeek(bufferDate).toISOString(),
          name,
        });
      }

      bufferDate = addWeeks(bufferDate, -1);
    }

    return result;
  },
);
