import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IUser {
  id: string;
  email: string;
  part: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

// TODO: mv to /types
export interface IDetail {
  id: string;
  email: string;
  part: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

type TAuthState = {
  user: IUser;
};

const initialState: TAuthState = {
  user: {
    id: '',
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
    setUser: (state, action: PayloadAction<IDetail>) => {
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
      state.user.part = action.payload.part;
      state.user.token.accessToken = action.payload.token.access_token;
      state.user.token.refreshToken = action.payload.token.refresh_token;
    },
  },
});

export const { setUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
