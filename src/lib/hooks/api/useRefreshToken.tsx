import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { selectUser, setUser } from '../../../store/slices/authSlice';
import { axiosPublic } from '../../api/axios';

function useRefreshToken() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  // TODO: delete console.log
  //console.log(`before refresh: ${user.accessToken}`);
  const refresh = async () => {
    const response = await axiosPublic.post('/refreshes/', {}, {});
    // TODO: delete console.log
    console.log(response?.data?.detail);
    const fetchedEmail: string = response?.data?.detail?.email;
    const fetchedAccessToken: string =
      response?.data?.detail?.token.access_token;
    dispatch(setUser({ email: fetchedEmail, accessToken: fetchedAccessToken }));
    return fetchedAccessToken;
  };
  //console.log(`after refresh: ${user.accessToken}`);
  return refresh;
}

export default useRefreshToken;
