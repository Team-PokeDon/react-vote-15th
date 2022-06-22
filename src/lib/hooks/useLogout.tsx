import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser, resetUser } from '../../store/auth/authSlice';
import { axiosPublic } from '../api/axios';

const useLogout = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(resetUser);
    try {
      console.log('adsf');
      // logout을 통해 rT 만료시킴 -> 그것을 로그아웃이라고 한다!!!
      const response = await axiosPublic.post('/logout/', {
        // secure cookie를 다시 보냄
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
