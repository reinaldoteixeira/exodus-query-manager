import { useRouter } from "next/router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Errors } from "../../../utils/getValidationErrors";
import FormGroup from "../../elements/FormGroup/FormGroup";
import Select from "../../elements/Select/Select";

interface User {
  email: string;
  name: string;
  role: number;
}

interface UserFormProps {
  onChange: (key: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => Promise<void>;
  errors?: Errors;
  user?: User;
  myAccount?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  onChange,
  onSubmit,
  errors,
  user,
  myAccount,
}) => {
  const router = useRouter();

  const roleOptions = [
    {
      label: "Admin",
      value: 1,
    },
    {
      label: "Moderator",
      value: 2,
    },
    {
      label: "Requester",
      value: 3,
    },
  ];

  const defaultOption = roleOptions.filter((option) => {
    if (option.value == user?.role) {
      return option;
    }
  });

  const handleChangeInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    onChange(name, value);
  };

  const handleCancel = () => {
    router.push(`/users`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Container fluid className="p-0">
        <Row>
          <Col sm="12" lg="6">
            <FormGroup hasError={!!errors.email} errorMessage={errors.email}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                autoComplete="none"
                defaultValue={user?.email}
                onChange={handleChangeInput}
                placeholder="Enter the email"
                disabled={myAccount || false}
                isInvalid={!!errors.email}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup hasError={!!errors.name} errorMessage={errors.name}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                autoComplete="none"
                defaultValue={user?.name}
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
                autoComplete="none"
                onChange={handleChangeInput}
                placeholder="Enter the password"
                isInvalid={!!errors.password}
              />
            </FormGroup>
          </Col>
          <Col sm="12" lg="6">
            <FormGroup hasError={!!errors.role} errorMessage={errors.role}>
              <Form.Label>Role</Form.Label>
              <Select
                instanceId="roleSelect"
                name="role"
                defaultValue={defaultOption}
                onChange={({ value }) => onChange("role", value)}
                options={roleOptions}
                isDisabled={myAccount || false}
                isInvalid={!!errors.role}
              />
            </FormGroup>
          </Col>
          <Col
            sm="12"
            className="d-flex align-items-center justify-content-end mt-3"
          >
            <Button
              type="button"
              variant="secondary"
              className="mr-2"
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

export default UserForm;
