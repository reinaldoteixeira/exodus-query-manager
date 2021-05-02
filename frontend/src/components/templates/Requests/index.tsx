import { Container, Col, Dropdown, Row, Table, Button } from 'react-bootstrap';

import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { ResponseRequest } from '../../../@types';

import { ThStatus } from './styles';

import useFetch from '../../../hooks/useFetch';

import Loader from '../../elements/Loader';
import PageTitle from '../../elements/PageTitle/PageTitle';
import RequestRow from '../../elements/RequestRow';
import Paginate from '../../elements/Paginate';

const Requests: React.FC = () => {
  const router = useRouter();

  const [filterStatus, setFilterStatus] = useState(0);
  const filterTake = 10;
  const [filterSkip, setFilterSkip] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const handleCreate = useCallback(() => {
    router.push(`/requests/create`);
  }, []);

  const handleSetFilter = useCallback(
    (status: number) => (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setFilterStatus(status);
    },
    []
  );

  const { data } = useFetch<ResponseRequest>(
    `requests/list?status=${filterStatus}&take=${filterTake}&skip=${filterSkip}`
  );

  const requestsData = data?.data;
  const total = data?.total;

  console.log(requestsData);

  if (!requestsData) {
    return <Loader />;
  }

  return (
    <Container fluid className="p-0">
      <Row className="mb-3 d-flex align-items-center">
        <Col>
          <PageTitle title="Requests" />
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Dropdown className="mr-2">
            <Dropdown.Toggle size="sm" variant="secondary">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleSetFilter(0)}>
                Waiting
              </Dropdown.Item>
              <Dropdown.Item onClick={handleSetFilter(1)}>Queued</Dropdown.Item>
              <Dropdown.Item onClick={handleSetFilter(2)}>Deny</Dropdown.Item>
              <Dropdown.Item onClick={handleSetFilter(3)}>
                Executed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" size="sm" onClick={handleCreate}>
            Create pull request
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover>
            <thead>
              <tr>
                <th>Summary</th>
                <ThStatus>Status</ThStatus>
              </tr>
            </thead>
            <tbody>
              {requestsData.map((request, index) => {
                return <RequestRow key={index} request={request}></RequestRow>;
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Paginate
        total={total}
        filterTake={filterTake}
        activePage={activePage}
        setFilterSkip={setFilterSkip}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Requests;
