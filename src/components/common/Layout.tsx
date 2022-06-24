import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/slices/authSlice';
import { media } from '../../lib/styles/theme';
import useLogout from '../../lib/hooks/auth/useLogout';
import useDecodeAccessToken from '../../lib/hooks/api/useDecodeAccessToken';

function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector(selectUser);

  const initUser = { user_id: null, part: '', name: '' };

  const { user_id, part, name } = user.accessToken
    ? useDecodeAccessToken(user.accessToken)
    : initUser;
  const logout = useLogout();

  const handleClickLogout = () => {
    logout();
  };

  const handleClickTitle = () => {
    if (pathname && pathname !== '/') {
      navigate('/');
    }
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <HeaderWrapper>
        <Header>
          <Title>
            <Logo onClick={handleClickTitle} title={'홈으로'} />
            <h1>
              <span>CEOS</span> 15기 임원진 투표
            </h1>
          </Title>
          <Profile>
            {user_id ? (
              <>
                <div>
                  {name} | {part}
                </div>
                <button onClick={handleClickLogout}>로그아웃</button>
              </>
            ) : (
              <button onClick={handleClickLogin}>로그인</button>
            )}
          </Profile>
        </Header>
      </HeaderWrapper>
      <Content className="content">
        <Outlet />
      </Content>
    </>
  );
}

export default Layout;

const HeaderWrapper = styled.div`
  height: 60px;
  background: ${({ theme }) => theme.palette.gray[2]};
  display: flex;
  justify-content: center;
  padding: 0px 12px;
`;

const Header = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-weight: 700;
  }
  span {
    color: ${({ theme }) => theme.palette.cyan[8]};
  }
`;

const Logo = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100px;
  height: 40px;
  margin-top: 6px;
  margin-right: 16px;
  :hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
    cursor: pointer;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  div {
    font-weight: 700;
    color: ${({ theme }) => theme.palette.gray[6]};
    ${media.custom(480)} {
      display: none;
    }
  }
  button {
    margin-left: 20px;
    border: none;
    background-color: ${({ theme }) => theme.palette.cyan[4]};
    :hover {
      background-color: ${({ theme }) => theme.palette.cyan[5]};
    }
    color: white;
    font-weight: 700;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 14.5px;
  }
`;

const Content = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;
