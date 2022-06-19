import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
<<<<<<< HEAD
import candidateReducer from '../candidate';
=======
import authReducer from '../auth/authSlice';
>>>>>>> fa07147a020e9de04a5f471decd0b8af5c5955d9
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
<<<<<<< HEAD
    candidate: candidateReducer,
=======
    auth: authReducer,
>>>>>>> fa07147a020e9de04a5f471decd0b8af5c5955d9
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
