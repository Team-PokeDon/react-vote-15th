import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccessToken, IFetchedUser, IUser } from '../../lib/types/users';
import { RootState } from '../app/store';

type TAuthState = {
  user: IUser;
};

const initialState: TAuthState = {
  user: {
    id: '',
    name: '',
    email: '',
    part: '',
    token: {
      accessToken: '',
      refreshToken: '',
    },
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IFetchedUser>) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.part = action.payload.part;
      state.user.token.accessToken = action.payload.token.access_token;
      state.user.token.refreshToken = action.payload.token.refresh_token;
    },
    resetUser: (state) => {
      state.user.id = '';
      state.user.name = '';
      state.user.email = '';
      state.user.part = '';
      state.user.token.accessToken = '';
      state.user.token.refreshToken = '';
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
