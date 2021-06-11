import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Errors } from '../../../utils/getValidationErrors';
import FormGroup from '../../elements/FormGroup/FormGroup';
import Select from '../../elements/Select/Select';
import { useRouter } from 'next/router';
import moment from 'moment';
import { ConfigType, DatabasesType, RequestType } from '../../../@types';
import api from '../../../services/api';

interface RequestFormProps {
  onChange: (key: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  errors?: Errors;
  request?: RequestType;
}

interface ContentType {
  databases: string[];
  hosts: string[];
}

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

const RequestForm: React.FC<RequestFormProps> = ({
  onChange,
  onSubmit,
  errors,
  request,
}) => {
  const router = useRouter();
  const [disabledSchedule, setDisabledSchedule] = useState(true);
  const [defaultSchedule, setDefaultSchedule] = useState('');
  const [databasesOptions, setDatabasesOptions] = useState([]);
  const [hostOptions, setHostOptions] = useState([]);

  const [defaultOptionHost, setDefaultOptionHost] = useState([]);
  const [defaultOptionDatabases, setDefaultOptionDatabases] = useState([]);

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
    loadData();
  }, []);

  const loadData = async () => {
    const response = await api.get<ConfigType>(`configs/list`);

    let content = response.data?.content;

    if (content) {
      const config: ContentType = JSON.parse(content);

      const databases = config?.databases.map((database) => {
        return {
          label: database,
          value: database,
        };
      });
      setDatabasesOptions(databases);

      const hosts = config?.hosts.map((host) => {
        return {
          label: host.split(':')[0] || host,
          value: host,
        };
      });
      setHostOptions(hosts);

      const defaultHost = config?.hosts
        .filter((option) => {
          if (option == request?.host) {
            return option;
          }
        })
        .map((host) => {
          return {
            label: host.split(':')[0] || host,
            value: host,
          };
        });

      setDefaultOptionHost(defaultHost);

      const defaultDatabases = config?.databases
        .filter((option) => {
          const databasesRequest: DatabasesType = JSON.parse(
            request?.databases || '[]'
          );
          let optionFound = null;

          databasesRequest.forEach((database) => {
            if (option == database.value) {
              optionFound = option;
            }
          });

          if (optionFound) {
            return optionFound;
          }
        })
        .map((database) => {
          return {
            label: database,
            value: database,
          };
        });

      setDefaultOptionDatabases(defaultDatabases);
    }
  };

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

  const defaultOptionTimeToRun = timeToRunOptions.filter((option) => {
    if (option.value == request?.time_to_run) {
      return option;
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
