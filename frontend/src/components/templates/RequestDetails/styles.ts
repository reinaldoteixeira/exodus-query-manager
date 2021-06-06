import { Row } from 'react-bootstrap';
import styled from 'styled-components';

export const RowPanel = styled(Row)`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .request-details-tabs {
    width: 100%;
  }

  .tab-content > .active {
    margin-top: 30px;
  }

  .tab-code {
    padding: 30px;
    border-radius: 10px;
    background: ${(props) => props.theme.colors.secondary};
  }
`;

export const RowActions = styled(Row)`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .request-reviewers {
    @media only screen and (min-width: 1025px) {
      width: 30%;
    }
    overflow: auto;

    .card-body {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }

  .request-actions {
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: auto;

    .card-body {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
`;

export const RowAlert = styled(Row)`
  padding: 10px;

  div {
    width: 100%;
    text-align: center;
  }
`;

export const Code = styled.code`
  font-size: 1rem;
  white-space: pre-line;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
`;

export const RequestInfo = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
`;
