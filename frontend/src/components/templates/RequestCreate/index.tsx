import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import getValidationErrors, {
  Errors,
} from '../../../utils/getValidationErrors';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';
import RequestForm from '../../modules/RequestForm';
import Breadcrumb from '../../elements/Breadcrumb';
import Loader from '../../elements/Loader';

interface RequestState {
  host: string;
  databases: string[];
  ddl: string;
  description: string;
  timeToRun: string;
  schedule: string;
}

const RequestCreate: React.FC = () => {
  const router = useRouter();

  const { user } = useAuth();

  const [errors, setErrors] = useState({} as Errors);
  const [request, setRequest] = useState({} as RequestState);
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (key: string, value: any) => {
    setRequest({
      ...request,
      [key]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      const schema = Yup.object().shape({
        host: Yup.string().required('Host is required'),
        databases: Yup.array()
          .of(Yup.object())
          .required('Databases are required'),
        ddl: Yup.string().required('DDL is required'),
        description: Yup.string().required('Description is required'),
        timeToRun: Yup.string().required('Time to run is required'),
        schedule: Yup.string()
          .nullable(true)
          .when('timeToRun', {
            is: 'schedule',
            then: Yup.string().required('Schedule is required'),
          }),
      });

      await schema.validate(request, {
        abortEarly: false,
      });

      if (request.schedule && request.timeToRun != 'schedule') {
        request.schedule = null;
      }

      setShowLoader(true);

      try {
        const response = await api.post('/requests', {
          ...request,
          userId: user.id,
        });

        const requestId = response.data.id;

        router.push(`/requests/${requestId}`);
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
      href: '/',
      text: 'Home',
    },
    {
      active: true,
      href: `/requests/create`,
      text: 'New request',
    },
  ];

  return (
    <Container fluid className="p-0">
      {showLoader && <Loader />}
      <Row>
        <Col>
          <PageTitle
            title="New request"
            description="Create new pull request"
          />
          <Breadcrumb items={breadcrumb} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Panel>
            <RequestForm
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

export default RequestCreate;
