import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as rp from 'redux-persist';
import { settingsReducer } from './settingsSlice';
import { tasksReducer } from '~/features/tasks/tasksSlice';
import { mainReducer } from '~/features/main/mainSlice';
import { designerReducer } from '~/features/designers/designerSlice';

const reducers = combineReducers({
  settings: settingsReducer,
  main: mainReducer,
  designer: designerReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['settings'],
  },
  reducers,
);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
      // },
      // immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
