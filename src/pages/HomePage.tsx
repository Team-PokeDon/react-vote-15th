import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../lib/hooks/useLogout';

function HomePage() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/linkpage');
  };

  return (
    <>
      <li>
        <Link to="/vote/frontend">FE 투표</Link>
      </li>
      <li>
        <Link to="/vote/backend">BE 투표</Link>
      </li>
      <button onClick={signOut}>로그아웃</button>
    </>
  );
}

export default HomePage;
