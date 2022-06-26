import jwt_decode from 'jwt-decode';
import { IAccessToken } from '../../lib/types/accessToken';

function useDecodeAccessToken(accessToken: string): IAccessToken {
  const { user }: { user: IAccessToken } = jwt_decode(accessToken);
  const user_id = user.user_id;
  const part = user.part;
  const name = user.name;
  return { user_id, part, name };
}

export default useDecodeAccessToken;
