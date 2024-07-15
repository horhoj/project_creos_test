import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MapDesignerItem, TopDesignerItem } from './types';
import { commentsApi } from '~/api/comments';
import { CommentResponseItem } from '~/api/comments.types';
import { getApiErrors } from '~/api/common';
import { issuesApi } from '~/api/issues';
import { IssueStatus } from '~/api/issues.types';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';
import { getUUID } from '~/utils/getUUID';

const SLICE_NAME = 'main';

interface IS {
  fetchCommentsRequest: RequestStateProperty<CommentResponseItem[]>;
  fetchIssuesRequest: RequestStateProperty<TopDesignerItem[]>;
}

const initialState: IS = {
  fetchCommentsRequest: makeRequestStateProperty(),
  fetchIssuesRequest: makeRequestStateProperty(),
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  selectors: {
    mainIsLoading: (state) => state.fetchCommentsRequest.isLoading || state.fetchIssuesRequest.isLoading,
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchCommentsThunk, 'fetchCommentsRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchIssuesThunk, 'fetchIssuesRequest');
  },
});

const fetchCommentsThunk = createAsyncThunk(`${SLICE_NAME}/fetchCommentsThunk`, async (_, store) => {
  try {
    const res = await commentsApi.fetchComments();

    return store.fulfillWithValue(commentsApi.lastTenCommentDataMapper(res));
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

const fetchIssuesThunk = createAsyncThunk(`${SLICE_NAME}/fetchIssuesThunk`, async (_, store) => {
  try {
    const issueList = await issuesApi.fetchIssues({ status: IssueStatus.Done });

    const issueMap: Record<string, MapDesignerItem[]> = {};

    issueList.forEach(({ id, designer, date_finished_by_designer, date_started_by_designer }) => {
      if (designer !== null && date_started_by_designer !== null && date_finished_by_designer !== null) {
        if (issueMap[designer] === undefined) {
          issueMap[designer] = [];
        }
        issueMap[designer].push({
          id,
          time: new Date(date_finished_by_designer).getTime() - new Date(date_started_by_designer).getTime(),
        });
      }
    });

    const topDesignerList = Object.keys(issueMap)
      .map((designer) => {
        const taskCount = issueMap[designer].length;
        const time = issueMap[designer].reduce((prev, curr) => prev + curr.time, 0) / taskCount;

        return { designer, time, taskCount, id: getUUID() };
      })
      .sort((a, b) => {
        if (a.taskCount === b.taskCount) {
          return a.time - b.time;
        }
        return b.taskCount - a.taskCount;
      })
      .slice(0, 10);

    return store.fulfillWithValue(topDesignerList);
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const mainReducer = reducer;

export const mainSlice = { actions, selectors, thunks: { fetchCommentsThunk, fetchIssuesThunk } } as const;
