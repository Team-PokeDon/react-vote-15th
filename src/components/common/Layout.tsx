import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

// const menus = [
//   {
//     destination: '',
//     text: 'Home',
//   },
//   {
//     destination: 'my',
//     text: 'My',
//   },
//   {
//     destination: 'settings',
//     text: 'Settings',
//   },
// ];

function Layout() {
  return (
    <>
      <Header>
        <img src={logo} />
      </Header>
      <Outlet />
    </>
  );
}

export default Layout;

const Header = styled.div`
  height: 80px;
  background: ${({ theme }) => theme.palette.gray[2]};

  img {
    object-fit: cover;
  }
`;
