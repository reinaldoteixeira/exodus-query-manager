import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Errors } from '../../../utils/getValidationErrors';
import FormGroup from '../../elements/FormGroup/FormGroup';
import Select from '../../elements/Select/Select';

interface User {
  email: string;
  name: string;
  password: string;
  role: string;
  groups: string[];
}

interface UserFormProps {
  onChange: (key: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  errors?: Errors;
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({
  onChange,
  onSubmit,
  errors,
  user,
}) => {

  const roleOptions = [
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Controller',
      value: 'controller',
    },
    {
      label: 'Reader',
      value: 'reader',
    },
  ];

  const groupOptions = [
    {
      label: 'organic-search',
      value: 'organic-search',
    },
    {
      label: 'arktis',
      value: 'arktis',
    }
  ];

  const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    onChange(name, value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Container fluid className="p-0">
        <Row>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.email}
              errorMessage={errors.email}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChangeInput}
                placeholder="Enter the email"
                isInvalid={!!errors.email}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.name}
              errorMessage={errors.name}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChangeInput}
                placeholder="Enter the name"
                isInvalid={!!errors.name}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.password}
              errorMessage={errors.password}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChangeInput}
                placeholder="Enter the password"
                isInvalid={!!errors.password}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.role}
              errorMessage={errors.role}
            >
              <Form.Label>Role</Form.Label>
              <Select
                instanceId="roleSelect"
                name="role"
                onChange={({ value }) => onChange('role', value)}
                options={roleOptions}
                isInvalid={!!errors.role}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup
              hasError={!!errors.groups}
              errorMessage={errors.groups}
            >
              <Form.Label>Groups</Form.Label>
              <Select
                instanceId="groupsSelect"
                name="groups"
                onChange={(event) => onChange('groups', event)}
                options={groupOptions}
                isMulti
                isInvalid={!!errors.groups}
              />
            </FormGroup>
          </Col>
          <Col sm="12" className="d-flex align-items-center justify-content-end mt-3">
            <Button
              type="submit"
              className="mr-2"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default UserForm;
