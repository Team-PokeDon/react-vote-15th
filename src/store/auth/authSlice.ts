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

export interface IAccessToken {
  access_token: string;
}

type TAuthState = {
  user: IUser;
};

const initialState: TAuthState = {
  // 토큰을 App state 즉 메모리에 저장한다. App 종료 시 모든 정보는 삭제된다.
  // localStorage 혹은 JS로 접근가능한 쿠키에 저장하는 방법은 토큰 탈취 위험 등 보안상 취약하다.
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
    refreshAccessToken: (state, action: PayloadAction<IAccessToken>) => {
      state.user.token.accessToken = action.payload.access_token;
    },
  },
});

export const { setUser, refreshAccessToken } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
