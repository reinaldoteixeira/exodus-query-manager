
import { Main, Error } from './styles';

interface FormGroupProps {
  hasError: boolean;
  errorMessage?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  hasError,
  errorMessage,
  children,
}) => {
  return (
    <Main>
      {children}
      <Error>
        {errorMessage}
      </Error>
    </Main>
  );
};

export default FormGroup;
