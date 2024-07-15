import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commentsApi } from '~/api/comments';
import { CommentResponseItem } from '~/api/comments.types';
import { getApiErrors } from '~/api/common';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';

const SLICE_NAME = 'main';

interface IS {
  fetchCommentsRequest: RequestStateProperty<CommentResponseItem[]>;
}

const initialState: IS = { fetchCommentsRequest: makeRequestStateProperty() };

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  selectors: {
    mainIsLoading: (state) => state.fetchCommentsRequest.isLoading,
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchCommentsThunk, 'fetchCommentsRequest');
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

export const mainReducer = reducer;

export const mainSlice = { actions, selectors, thunks: { fetchCommentsThunk } } as const;
