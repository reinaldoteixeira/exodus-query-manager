import styled from 'styled-components';

export const Main = styled.div`
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  display: flex;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
`;

export default Main;
