import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'settingsSlice';

interface IS {
  isDark: boolean;
}

const initialState: IS = {
  isDark: true,
};

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    isDarkToggle: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const settingsReducer = reducer;

export const settingsSlice = { actions } as const;
