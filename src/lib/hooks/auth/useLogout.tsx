import { useDispatch } from 'react-redux';
import { resetUser } from '../../../store/auth/authSlice';
import { axiosPublic } from '../../api/axios';

function useLogout() {
  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(resetUser);
    try {
      const response = await axiosPublic.post('/logout/', {});
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
}

export default useLogout;
