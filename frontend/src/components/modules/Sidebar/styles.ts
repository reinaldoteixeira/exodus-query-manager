import ReactSidenNav from '@trendmicro/react-sidenav';
import styled from 'styled-components';

export const SideNav = styled(ReactSidenNav)`
  background: ${props => props.theme.colors.primary};
  position: fixed;
`;

export default SideNav;
