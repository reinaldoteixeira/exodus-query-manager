import styled from 'styled-components';
import { Row } from 'react-bootstrap';

export const RowPie = styled(Row)`
  height: 250px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const RowTable = styled(Row)`
  display: flex;
  padding: 0 15px 0 15px;
  overflow-y: auto;
  max-height: 300px;
`;

export const RowEmpty = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
  height: 300px;

  .icon {
    font-size: 30px;
    margin-right: 10px;
  }

  h3 {
    margin: 0;
  }
`;
