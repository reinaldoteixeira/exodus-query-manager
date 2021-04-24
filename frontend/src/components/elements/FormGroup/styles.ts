import styled from 'styled-components';

export const Main = styled.div`
  margin-bottom: 5px;
`;

export const Error = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: 12px;
  height: 20px;
  margin-top: 2px;
`;

export default Main;
