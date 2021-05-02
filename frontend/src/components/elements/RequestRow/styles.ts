import styled from 'styled-components';

export const RequestTitle = styled.p`
  font-weight: bold;
  color: rgb(66, 82, 110);
  font-size: 15px;
  white-space: nowrap;
  margin-bottom: 0;
  display: inline;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const RequestDescription = styled.p`
  color: #6b778c;
  font-size: 11px;
  margin-bottom: 0;
`;

export const RequestStatus = styled.p`
  color: #6b778c;
  font-size: 16px;
  margin-bottom: 0;
  text-align: center;
`;

export const RequestImage = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  font-weight: bold;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
