import { Pagination as PaginationReact } from 'react-bootstrap';

import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .page-item.active .page-link {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }

  .page-link {
    color: ${(props) => props.theme.colors.primary};
  }

  .page-link:focus {
    box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors.primary};
  }
`;

export const Pagination = styled(PaginationReact)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
