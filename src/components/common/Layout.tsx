import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
      <header></header>
      <Outlet />
    </>
  );
}

export default Layout;

// const MenuItem = styled(NavLink)`
//   &.active {
//     font-size: bold;
//     border-bottom: 1px solid;
//   }

//   & + & {
//     margin-left: 1rem;
//   }
// `;
