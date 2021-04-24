import { Navbar as ReactNavbar } from 'react-bootstrap';
import styled from 'styled-components';

export const Navbar = styled(ReactNavbar)`
  background: #ffffff;
  margin-bottom: 20px;
  min-height: 64px;
  transition: 0.2s;

  &.open {
    margin-left: 175px;
    transition: 0.2s;
  }

  .navbar-brand {
    color: ${props => props.theme.colors.primary};
  }
`;

export default Navbar;
