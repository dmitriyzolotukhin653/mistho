import { configureStore } from '@reduxjs/toolkit';
import newsSlice from '../effects/news/newsSlice';
import userSlice from '../effects/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    news: newsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
