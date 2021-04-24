
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import getValidationErrors, { Errors } from '../../../utils/getValidationErrors';
import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';
import UserForm from '../../modules/UserForm/UserForm';

interface UserState {
  email: string;
  name: string;
  password: string;
  role: string;
  groups: string[];
}

const UserDetails: React.FC = () => {
  const [user, setUser] = useState({} as UserState);
  const [errors, setErrors] = useState({} as Errors);

  const handleChange = (key: string, value: any) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email(),
        name: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required').min(6, 'Minimum of 6 characters'),
        role: Yup.string().required('Role is required'),
        groups: Yup.array().of(Yup.string()).required('Groups are required'),
      });

      await schema.validate(user, {
        abortEarly: false,
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);
        setErrors(validationErrors);
      }
    }
  };

  return (
    <Container fluid className="p-0">
      <Row>
        <Col>
          <PageTitle
            title="User details"
            description="Edit user details"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Panel>
            <UserForm
              onChange={handleChange}
              onSubmit={handleSubmit}
              errors={errors}
              user={user}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
