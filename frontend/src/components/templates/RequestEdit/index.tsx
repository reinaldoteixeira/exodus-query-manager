import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import getValidationErrors, {
  Errors,
} from '../../../utils/getValidationErrors';

import api from '../../../services/api';

import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';
import RequestForm from '../../modules/RequestForm';
import Breadcrumb from '../../elements/Breadcrumb';
import Loader from '../../elements/Loader';
import { RequestType } from '../../../@types';

interface RequestState {
  host: string;
  databases: string;
  ddl_command: string;
  description: string;
  time_to_run: string;
  schedule: string;
}

const RequestEdit: React.FC = () => {
  const router = useRouter();

  const [errors, setErrors] = useState({} as Errors);
  const [request, setRequest] = useState<RequestType>();
  const [changedRequest, setChangedRequest] = useState({} as RequestState);
  const [showLoader, setShowLoader] = useState(false);

  const requestIdParam = router.query.id;

  useEffect(() => {
    if (!request && requestIdParam) {
      loadData(requestIdParam);
    }
  }, [requestIdParam]);

  const loadData = async (requestId: string | string[]) => {
    const response = await api.get<RequestType>(`requests/detail/${requestId}`);
    const request = response.data;
    setRequest(request);
  };

  if (!request) {
    return <Loader />;
  }

  const handleChange = (key: string, value: any) => {
    setChangedRequest({
      ...changedRequest,
      [key]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      if (!changedRequest.databases) {
        changedRequest.databases = JSON.parse(request.databases || '[]');
      }

      if (!changedRequest.ddl_command) {
        changedRequest.ddl_command = request.ddl_command;
      }

      if (!changedRequest.description) {
        changedRequest.description = request.description;
      }

      event.preventDefault();

      const schema = Yup.object().shape({
        databases: Yup.array()
          .of(Yup.object())
          .min(1)
          .required('Databases is required'),
        ddl_command: Yup.string().required('DDL is required'),
        description: Yup.string().required('Description is required'),
        schedule: Yup.string()
          .nullable(true)
          .when('time_to_run', {
            is: 'schedule',
            then: Yup.string().required('Schedule is required'),
          }),
      });

      await schema.validate(changedRequest, {
        abortEarly: false,
      });

      if (request.schedule && request.time_to_run != 'schedule') {
        request.schedule = null;
      }

      try {
        setShowLoader(true);

        const response = await api.patch(`/requests/edit/${requestIdParam}`, {
          ...changedRequest,
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
      href: `/requests/${requestIdParam}`,
      text: `${requestIdParam}`,
    },
  ];

  return (
    <Container fluid className="p-0">
      {showLoader && <Loader />}
      <Row>
        <Col>
          <PageTitle title="Edit request" description="Edit request details" />
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
              request={request}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestEdit;
