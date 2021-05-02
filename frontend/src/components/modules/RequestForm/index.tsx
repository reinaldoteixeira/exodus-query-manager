import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Errors } from '../../../utils/getValidationErrors';
import FormGroup from '../../elements/FormGroup/FormGroup';
import Select from '../../elements/Select/Select';
import { useRouter } from 'next/router';
import moment from 'moment';

interface UserFormProps {
  onChange: (key: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  errors?: Errors;
}

const hostOptions = [
  {
    label: 'Localhost',
    value: 'localhost',
  },
  {
    label: 'Lyra',
    value: 'localhost1',
  },
  {
    label: 'Orion',
    value: 'localhost2',
  },
];

const timeToRunOptions = [
  {
    label: 'Anytime',
    value: 'anytime',
  },
  {
    label: 'As soon as possible',
    value: 'soon',
  },
  {
    label: 'Schedule time',
    value: 'schedule',
  },
];

const databasesOptions = [
  {
    label: 'edoc',
    value: 'edoc',
  },
  {
    label: 'edoc_2',
    value: 'edoc_2',
  },
  {
    label: 'edoc_468',
    value: 'edoc_468',
  },
  {
    label: 'edoc_493',
    value: 'edoc_493',
  },
];

const RequestForm: React.FC<UserFormProps> = ({
  onChange,
  onSubmit,
  errors,
}) => {
  const router = useRouter();
  const [disabledSchedule, setDisabledSchedule] = useState(true);

  const handleChangeInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    onChange(name, value);
  };

  const handleChangeTimeToRun = (value: string) => {
    if (value == 'anytime' || value == 'soon') {
      setDisabledSchedule(true);
      errors.schedule = null;
      return onChange('timeToRun', value);
    }
    setDisabledSchedule(false);

    return onChange('timeToRun', value);
  };

  const handleChangeSchedule = (target) => {
    const { name, value } = target;
    errors.schedule = null;
    const date = moment(value).utc().format('YYYY-MM-DD HH:mm');
    return onChange(name, date);
  };

  const handleCancel = () => {
    router.push(`/`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Container fluid className="p-0">
        <Row>
          <Col sm="12" lg="6">
            <FormGroup hasError={!!errors.host} errorMessage={errors.host}>
              <Form.Label>Host</Form.Label>
              <Select
                instanceId="host"
                name="host"
                onChange={({ value }) => onChange('host', value)}
                options={hostOptions}
                isInvalid={!!errors.host}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.databases}
              errorMessage={errors.databases}
            >
              <Form.Label>Databases</Form.Label>
              <Select
                instanceId="databases"
                name="databases"
                onChange={(value) => onChange('databases', value)}
                options={databasesOptions}
                isMulti
                isInvalid={!!errors.databases}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="12">
            <FormGroup hasError={!!errors.ddl} errorMessage={errors.ddl}>
              <Form.Label>DDL Command (SQL)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ddl"
                onChange={handleChangeInput}
                placeholder="Enter the SQL"
                isInvalid={!!errors.ddl}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.description}
              errorMessage={errors.description}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={handleChangeInput}
                placeholder="Enter the description"
                isInvalid={!!errors.description}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.timeToRun}
              errorMessage={errors.timeToRun}
            >
              <Form.Label>Time to Run</Form.Label>
              <Select
                instanceId="timeToRun"
                name="timeToRun"
                onChange={({ value }) => handleChangeTimeToRun(value)}
                options={timeToRunOptions}
                isInvalid={!!errors.timeToRun}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.schedule}
              errorMessage={errors.schedule}
            >
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                type="datetime-local"
                disabled={disabledSchedule}
                name="schedule"
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeSchedule(target)
                }
                isInvalid={!!errors.schedule}
              />
            </FormGroup>
          </Col>
          <Col
            sm="12"
            className="d-flex align-items-center justify-content-end mt-3"
          >
            <Button
              type="button"
              className="mr-2"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default RequestForm;
