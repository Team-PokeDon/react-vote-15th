import jwt_decode from 'jwt-decode';

interface IAccessToken {
  user_id: number | null;
  part: string;
  name: string;
}

function useDecodeAccessToken(accessToken: string): IAccessToken {
  console.log(accessToken);
  const { user }: { user: IAccessToken } = jwt_decode(accessToken);
  console.log(user);
  const user_id = user.user_id;
  const part = user.part;
  const name = user.name;
  return { user_id, part, name };
}

export default useDecodeAccessToken;
