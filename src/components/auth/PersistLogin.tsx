import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import useRefreshToken from '../../lib/hooks/api/useRefreshToken';
import useLocalStorage from '../../lib/hooks/auth/useLocalStorage';
import { selectUser } from '../../store/slices/authSlice';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const user = useAppSelector(selectUser);
  const [persist] = useLocalStorage('persist', false);

  // @ts-expect-error
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false); // escape memory leaks
      }
    };
    // verify only on refresh
    !user?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  // TODO: delete following test code
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(user?.accessToken)}`);
  }, [isLoading]);

  // TODO: Loading -> loading spinner
  /*   if (!persist) {
    return <Outlet />;
  } else {
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return <Outlet />;
    }
  } */
  // TODO: delete following comment
  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
}

export default PersistLogin;
