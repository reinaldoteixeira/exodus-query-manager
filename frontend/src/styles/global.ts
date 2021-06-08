import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: Roboto, sans-serif;
}

.react-bootstrap-table table {
  table-layout: auto;
}

input:focus {
  border-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 .125rem .25rem ${(props) =>
    props.theme.colors.primary}30 !important;
  color: ${(props) => props.theme.colors.text} !important;
}

.form-control.is-invalid {
  border-color: ${(props) => props.theme.colors.danger};
}

.form-control:focus {
  border-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 .125rem .25rem ${(props) => props.theme.colors.primary}30;
}

table {
  color: ${(props) => props.theme.colors.textDark} !important;
}

::placeholder {
  color: ${(props) => props.theme.colors.text}95 !important;
}

button:focus {
  box-shadow: none !important;
}

button:not(:disabled):not(.disabled):active:focus {
  box-shadow: none !important;
}

button.btn-primary {
  background: ${(props) => props.theme.colors.primary} !important;
  border-color: ${(props) => props.theme.colors.primary} !important;
  box-shadow: 0 .125rem .25rem ${(props) =>
    props.theme.colors.primary}75 !important;
}

button.btn-secondary {
  background: ${(props) => props.theme.colors.secondary} !important;
  border-color: ${(props) => props.theme.colors.secondary} !important;
  box-shadow: 0 .125rem .25rem ${(props) =>
    props.theme.colors.secondary}75 !important;
}

button.btn-success {
  background: ${(props) => props.theme.colors.success} !important;
  border-color: ${(props) => props.theme.colors.success} !important;
  box-shadow: 0 .125rem .25rem ${(props) =>
    props.theme.colors.success}75 !important;
}

button.btn-warning {
  background: ${(props) => props.theme.colors.warning} !important;
  border-color: ${(props) => props.theme.colors.warning} !important;
  box-shadow: 0 .125rem .25rem ${(props) =>
    props.theme.colors.warning}75 !important;
}

button.btn-danger {
  background: ${(props) => props.theme.colors.danger} !important;
  border-color: ${(props) => props.theme.colors.danger} !important;
  box-shadow: 0 .125rem .25rem ${(props) =>
    props.theme.colors.danger}75 !important;
}

button.btn-light {
  background: ${(props) => props.theme.colors.light} !important;
  border-color: ${(props) => props.theme.colors.light} !important;
}

.bg-primary {
  background: ${(props) => props.theme.colors.primary} !important;
}

.bg-secondary {
  background: ${(props) => props.theme.colors.secondary} !important;
}

.bg-success {
  background: ${(props) => props.theme.colors.success} !important;
}

.bg-warning {
  background: ${(props) => props.theme.colors.warning} !important;
}

.bg-danger {
  background: ${(props) => props.theme.colors.danger} !important;
}

.bg-light {
  background: ${(props) => props.theme.colors.light} !important;
}

a {
  color: ${(props) => props.theme.colors.primary};
}

a:hover {
  color: ${(props) => props.theme.colors.primary};
}

`;
