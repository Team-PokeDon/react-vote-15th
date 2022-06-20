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
      <Header></Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default Layout;

const Header = styled.div`
  height: 60px;
  background: ${({ theme }) => theme.palette.gray[2]};
`;
const Content = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
