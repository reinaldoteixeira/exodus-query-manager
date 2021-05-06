import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;

  h1 {
    color: ${(props) => props.theme.colors.light};
    text-transform: uppercase;
  }

  a {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
