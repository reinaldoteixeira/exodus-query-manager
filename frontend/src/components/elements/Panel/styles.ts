import { Card as ReactCard } from 'react-bootstrap';
import styled from 'styled-components';

export const Header = styled(ReactCard.Header)`
  background: ${props => props.theme.colors.light};
  border-color: #e3e6f0;
  font-weight: bold;
`;

export default Header;
