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
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user.email = action.payload.email;
      state.user.accessToken = action.payload.accessToken;
    },
    resetUser: (state) => {
      state.user.email = '';
      state.user.accessToken = '';
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
