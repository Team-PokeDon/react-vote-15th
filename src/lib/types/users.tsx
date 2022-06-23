export interface IFetchedUser {
  id: string;
  name: string;
  email: string;
  part: 'FE' | 'BE';
  token: {
    access_token: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  part: '' | 'FE' | 'BE';
  token: {
    accessToken: string;
  };
}
