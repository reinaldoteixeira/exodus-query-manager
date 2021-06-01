import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import api from '../../../services/api';
import getValidationErrors, {
  Errors,
} from '../../../utils/getValidationErrors';

import Breadcrumb from '../../elements/Breadcrumb';
import Loader from '../../elements/Loader';
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

const UserCreate: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState({} as UserState);
  const [errors, setErrors] = useState({} as Errors);
  const [showLoader, setShowLoader] = useState(false);

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
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Minimum of 6 characters'),
        role: Yup.string().required('Role is required'),
      });

      await schema.validate(user, {
        abortEarly: false,
      });

      setShowLoader(true);

      try {
        await api.post('/users', {
          ...user,
        });

        router.push(`/users`);
      } catch (err) {
        console.log(`ERROR: ${err}`);
      }

      setShowLoader(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);
        setErrors(validationErrors);
      }
    }
  };

  const breadcrumb = [
    {
      active: true,
      href: '/users',
      text: 'Users',
    },
    {
      active: true,
      href: `/users/create`,
      text: 'New user',
    },
  ];

  return (
    <Container fluid className="p-0">
      {showLoader && <Loader />}
      <Row>
        <Col>
          <PageTitle title="New user" description="Create new user" />
          <Breadcrumb items={breadcrumb} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Panel>
            <UserForm
              onChange={handleChange}
              onSubmit={handleSubmit}
              errors={errors}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCreate;
