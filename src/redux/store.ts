import { configureStore } from '@reduxjs/toolkit';
import { pixabayApi } from './pixabay_api';

export const store = configureStore({
  reducer: {
    [pixabayApi.reducerPath]: pixabayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pixabayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
