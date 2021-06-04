import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import getValidationErrors, {
  Errors,
} from '../../../utils/getValidationErrors';

import api from '../../../services/api';
import { UserType } from '../../../@types';

import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';
import UserForm from '../../modules/UserForm/UserForm';
import Loader from '../../elements/Loader';
import BreadCrumb from '../../elements/Breadcrumb';

interface UserState {
  email: string;
  name: string;
  password: string;
  role: string;
}

const UserDetails: React.FC = () => {
  const [changedUser, setChangedUser] = useState({} as UserState);
  const [errors, setErrors] = useState({} as Errors);
  const [user, setUser] = useState<UserType>();
  const [showLoader, setShowLoader] = useState(false);

  const router = useRouter();
  const userId = router.query.id;

  useEffect(() => {
    if (!user && userId) {
      loadData(userId);
    }
  }, [userId]);

  const loadData = async (userId: string | string[]) => {
    const response = await api.get<UserType>(`users/detail/${userId}`);
    const user = response.data;
    setUser(user);
  };

  if (!user) {
    return <Loader />;
  }

  const handleChange = (key: string, value: any) => {
    setChangedUser({
      ...changedUser,
      [key]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      const schema = Yup.object().shape({
        email: Yup.string().email(),
        name: Yup.string(),
        password: Yup.string().min(6, 'Minimum of 6 characters'),
        role: Yup.string(),
      });

      await schema.validate(changedUser, {
        abortEarly: false,
      });

      setShowLoader(true);

      try {
        await api.patch(`/users/edit/${userId}`, {
          ...changedUser,
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
      href: `/users/${userId}`,
      text: user.email,
    },
  ];

  return (
    <Container fluid className="p-0">
      {showLoader && <Loader />}
      <Row>
        <Col>
          <PageTitle title="User details" description="Edit user details" />
          <BreadCrumb items={breadcrumb} />
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
