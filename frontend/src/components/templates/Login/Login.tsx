import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { Main, Title, Panel } from './styles';
import { useAuth } from '../../../hooks/auth';
import getValidationErrors, {
  Errors,
} from '../../../utils/getValidationErrors';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const { authenticated, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({} as Errors);
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent<EventTarget>) => {
    try {
      event.preventDefault();

      const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email(),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(
        {
          email,
          password,
        },
        {
          abortEarly: false,
        }
      );

      await signIn({
        email,
        password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);
        setErrors(validationErrors);
      }
    }
  };

  return (
    <Main>
      <Title>
        <label>Welcome to</label>
        <h5>Exodus Query Manager</h5>
      </Title>
      <Panel className="shadow-lg">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={({ target }) => {
                setEmail(target.value);
              }}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button block type="submit">
            Enter
          </Button>
        </Form>
      </Panel>
    </Main>
  );
};

export default Login;
