import ReactSidenNav, {
  NavItem as ReactNavItem,
} from '@trendmicro/react-sidenav';

import styled from 'styled-components';

const SideNav = styled(ReactSidenNav)`
  background: ${(props) => props.theme.colors.primary};
  position: fixed;
  [class*='sidenav---icon'] {
    background-color: ${(props) => props.theme.colors.secondary} !important;
  }
`;

const NavItem = styled(ReactNavItem)`
  &&&:hover {
    [class*='navtext--'] {
      color: ${(props) => props.theme.colors.background} !important;
    }
  }
  &&&:hover {
    [class*='svg-inline--fa'] {
      color: ${(props) => props.theme.colors.background} !important;
    }
  }

  [class*='sidenav---navtext'] {
    color: ${(props) => props.theme.colors.secondary} !important;
  }

  [class*='svg-inline--fa'] {
    color: ${(props) => props.theme.colors.secondary} !important;
  }
`;

export { SideNav, NavItem };
