import { useDispatch } from 'react-redux';
import { resetCredentials } from '../../store/slices/authSlice';
import useAxiosPrivate from '../api/useAxiosPrivate';

function useLogout() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    dispatch(resetCredentials());
    try {
      const response = await axiosPrivate.post('/users/logouts/', {}, {});
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
}

export default useLogout;
