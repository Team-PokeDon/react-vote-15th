import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser, setUser } from '../../store/auth/authSlice';
import axios from '../api/axios';

const useLogout = () => {
  // const {setAuth} = useAuth();
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const logout = async () => {
    //  setAuth({});
    const id = '';
    const name = '';
    const email = '';
    const part = '';
    const accessToken = '';
    // dispatch(setUser({ id, name, email, part, accessToken }));
    try {
      // logout을 통해 rT 만료시킴 -> 그것을 로그아웃이라고 한다!!!
      const response = await axios('/logout', {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
