import styled from 'styled-components';

export const Main = styled.div`
  cursor: pointer;
  font-size: 14px;
  padding-right: 20px;

  ul {
    background: #ffffff;
    border: 1px solid ${props => props.theme.colors.light};
    border-radius: 4px;
    list-style-type: none;
    margin-top: 10px;
    padding: 10px 0px;
    position: absolute;
    right: 30px;

    li {
      align-items: center;
      cursor: pointer;
      display: flex;
      padding: 5px 20px;

      &:hover {
        color: ${props => props.theme.colors.primary};
      }

      .icon {
        margin-right: 5px;
      }
    }
  }
`;

export default Main;
