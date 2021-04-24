import { Spinner as ReactSpinner } from 'react-bootstrap';
import styled from 'styled-components';

export const Spinner = styled(ReactSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${(props) => props.theme?.colors?.primary};
  width: 3rem;
  height: 3rem;
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  margin-top: -20px;
  margin-left: -25px;
  background-color: rgba(0, 0, 0, 0.3);
`;
