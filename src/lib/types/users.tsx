export interface IFetchedUser {
  id: string;
  name: string;
  email: string;
  part: string;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  part: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IAccessToken {
  access_token: string;
}
