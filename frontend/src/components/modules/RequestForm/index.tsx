import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Errors } from '../../../utils/getValidationErrors';
import FormGroup from '../../elements/FormGroup/FormGroup';
import Select from '../../elements/Select/Select';
import { useRouter } from 'next/router';
import moment from 'moment';
import { DatabasesType, RequestType } from '../../../@types';

interface RequestFormProps {
  onChange: (key: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  errors?: Errors;
  request?: RequestType;
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
  {
    label: 'Manual',
    value: 'manual',
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

const RequestForm: React.FC<RequestFormProps> = ({
  onChange,
  onSubmit,
  errors,
  request,
}) => {
  const router = useRouter();
  const [disabledSchedule, setDisabledSchedule] = useState(true);
  const [defaultSchedule, setDefaultSchedule] = useState('');

  const handleDefaultSchedule = (
    schedule: Date | null,
    timeToRun: string | null
  ) => {
    if (schedule && timeToRun == 'schedule') {
      setDisabledSchedule(false);
      setDefaultSchedule(moment(schedule).format('YYYY-MM-DDTHH:mm'));
      return;
    }

    setDefaultSchedule('');
    setDisabledSchedule(true);
    onChange('schedule', null);
  };

  useEffect(() => {
    handleDefaultSchedule(request?.schedule, request?.time_to_run);
  }, []);

  const handleChangeInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    onChange(name, value);
  };

  const handleChangeTimeToRun = (value: string) => {
    if (value != 'schedule') {
      setDisabledSchedule(true);
      errors.schedule = null;
      return onChange('time_to_run', value);
    }
    setDisabledSchedule(false);

    return onChange('time_to_run', value);
  };

  const handleChangeSchedule = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    errors.schedule = null;
    const date = moment(value).format('YYYY-MM-DD HH:mm');
    return onChange(name, date);
  };

  const handleCancel = () => {
    router.push(`/`);
  };

  const defaultOptionHost = hostOptions.filter((option) => {
    if (option.value == request?.host) {
      return option;
    }
  });

  const defaultOptionTimeToRun = timeToRunOptions.filter((option) => {
    if (option.value == request?.time_to_run) {
      return option;
    }
  });

  const defaultOptionDatabases = databasesOptions.filter((option) => {
    const databases: DatabasesType = JSON.parse(request?.databases || '[]');
    let optionFound = null;

    databases.forEach((database) => {
      if (option.value == database.value) {
        optionFound = option;
      }
    });

    if (optionFound) {
      return optionFound;
    }
  });

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
                defaultValue={defaultOptionHost}
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
                defaultValue={defaultOptionDatabases}
                onChange={(value: string) => onChange('databases', value)}
                options={databasesOptions}
                isMulti
                isInvalid={!!errors.databases}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="12">
            <FormGroup
              hasError={!!errors.ddl_command}
              errorMessage={errors.ddl_command}
            >
              <Form.Label>DDL Command (SQL)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ddl_command"
                defaultValue={request?.ddl_command}
                onChange={handleChangeInput}
                placeholder="Enter the SQL"
                isInvalid={!!errors.ddl_command}
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
                defaultValue={request?.description}
                onChange={handleChangeInput}
                placeholder="Enter the description"
                isInvalid={!!errors.description}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.time_to_run}
              errorMessage={errors.time_to_run}
            >
              <Form.Label>Time to Run</Form.Label>
              <Select
                instanceId="time_to_run"
                name="time_to_run"
                defaultValue={defaultOptionTimeToRun}
                onChange={({ value }) => handleChangeTimeToRun(value)}
                options={timeToRunOptions}
                isInvalid={!!errors.time_to_run}
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
                defaultValue={defaultSchedule}
                onChange={handleChangeSchedule}
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
