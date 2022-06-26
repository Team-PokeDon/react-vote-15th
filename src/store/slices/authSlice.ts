import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../lib/types/users';
import { RootState } from '../app/store';

type TAuthState = {
  user: IUser;
};

const initialState: TAuthState = {
  user: {
    email: '',
    accessToken: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.user.email = action.payload.email;
      state.user.accessToken = action.payload.accessToken;
    },
    resetCredentials: (state) => {
      state.user.email = '';
      state.user.accessToken = '';
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
