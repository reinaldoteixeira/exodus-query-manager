import styled from 'styled-components';

export const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.light};
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  text-transform: uppercase;

  label {
    margin-bottom: 2px;
  }

  h5 {
    font-size: 24px;
    font-weight: bold;
  }

`;

export const Panel = styled.div`
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  height: 300px;
  justify-content: center;
  width: 500px;
`;
