import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { Button, Container, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';
import api from '../../../services/api';
import Loader from '../../elements/Loader';
import { UserType } from '../../../@types';

const UsersPage: React.FC = () => {
  const router = useRouter();

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (!usersData.length) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const response = await api.get<UserType[]>(`users/list`);

    const data = response?.data;

    setUsersData(data);
  };

  if (!usersData) {
    return <Loader />;
  }

  const columns: ColumnDescription<any, any>[] = [
    {
      dataField: 'email',
      text: 'Email',
      formatter: (cell, user) => {
        return <Link href={`/users/${user.id}`}>{cell}</Link>;
      },
    },
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'role',
      text: 'Role',
      classes: 'text-capitalize',
      formatter: (role) => {
        switch (role) {
          case 1:
            return 'Admin';
          case 2:
            return 'Moderator';
          case 3:
            return 'Requester';
        }
      },
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
          <Button size="sm" onClick={handleCreate}>
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
              data={usersData}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersPage;
