import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { selectUser, setUser } from '../../../store/auth/authSlice';
import { axiosPublic } from '../../api/axios';

const useRefreshToken = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  // TODO: delete console.log
  console.log(`before ${user.token.accessToken}`);
  const refresh = async () => {
    const response = await axiosPublic.get('/refreshes/', {});
    // TODO: delete console.log
    console.log(response?.data?.detail);
    dispatch(setUser(response?.data?.detail));
    return response.data.detail.access_token;
  };
  return refresh;
};

export default useRefreshToken;
