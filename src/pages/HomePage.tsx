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
        <Link to="/vote/frontend">프론트엔드 엔지니어 파트장 투표하러가기</Link>
      </li>
      <li>
        <Link to="/vote/backend">API 쟁이들 파트장 투표하러가기</Link>
      </li>
      <button onClick={signOut}>로그아웃</button>
    </>
  );
}

export default HomePage;
