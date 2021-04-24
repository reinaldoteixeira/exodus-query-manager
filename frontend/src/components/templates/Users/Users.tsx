import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Button, Container, Col, Row } from 'react-bootstrap';
import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';

const UsersPage: React.FC = () => {
  const router = useRouter();

  const columns: ColumnDescription<any, any>[] = [
    {
      dataField: 'email',
      text: 'Email',
      formatter: (cell) => (
        <Link href={`/users/${cell}`}>{cell}</Link>
      ),
    },
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'role',
      text: 'Role',
      classes: 'text-capitalize',
    },
  ];
  const data = [
    {
      email: 'user@teste.com',
      name: 'Username',
      role: 'admin',
    },
  ];

  const handleCreate = useCallback(() => {
    router.push('/users/create');
  }, []);

  return (
    <Container fluid className="p-0">
      <Row className="mb-3 d-flex align-items-center">
        <Col>
          <PageTitle
            title="Users"
            description="Manager the application users"
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            size="sm"
            onClick={handleCreate}
          >
            Create user
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Panel title="Users">
            <BootstrapTable
              keyField="email"
              bordered={false}
              columns={columns}
              data={data}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersPage;
