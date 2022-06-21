import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectUser, setUser } from '../../store/auth/authSlice';
import axios from '../api/axios';

const useRefreshToken = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    console.log(user); // prev
    const id = user.id;
    // const name = user.name;
    const email = user.email;
    const part = user.part;
    const accessToken = response.data.accessToken; // new access token
    // dispatch(setUser({ id, name, email, part, accessToken }));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
