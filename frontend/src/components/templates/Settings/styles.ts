import styled from "styled-components";
import { Container as ReactContainer } from "react-bootstrap";

export const Container = styled(ReactContainer)`
  .form-control:focus {
    border: none !important;
  }

  .error {
    color: red;
    background-color: #f2dede;
  }

  .success {
    color: green;
    background-color: #d0e9c6;
  }
`;
