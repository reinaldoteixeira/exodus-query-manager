import styled from 'styled-components';

export const Container = styled.div`
  .approve {
    border-color: #36b37e;
  }
  .request-changes {
    border-color: #ffab00;
  }
`;

export const RequestImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 3px solid;

  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.background};

  font-weight: bold;
  width: 2.5rem;
  height: 2.5rem;

  cursor: pointer;
`;
