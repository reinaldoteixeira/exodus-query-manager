import { Container, Col, Dropdown, Row, Table, Button } from 'react-bootstrap';

import { useRouter } from 'next/router';

import { ThStatus, ThReviewers } from './styles';

import PageTitle from '../../elements/PageTitle/PageTitle';
import RequestRow from '../../elements/RequestRow';

const Requests: React.FC = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push(`/requests/create`);
  };

  return (
    <Container fluid className="p-0">
      <Row className="mb-3 d-flex align-items-center">
        <Col>
          <PageTitle title="Requests" />
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Dropdown className="mr-2">
            <Dropdown.Toggle size="sm" variant="primary">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Waiting</Dropdown.Item>
              <Dropdown.Item>Queued</Dropdown.Item>
              <Dropdown.Item>Deny</Dropdown.Item>
              <Dropdown.Item>Executed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="secondary" size="sm" onClick={handleCreate}>
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
                <ThReviewers>Reviewers</ThReviewers>
              </tr>
            </thead>
            <tbody>
              <RequestRow
                id="01F3DAT3EZN8BBDNCNYQKZKWKC"
                requesterImage="https://instagram.fbau4-1.fna.fbcdn.net/v/t51.2885-19/s150x150/131076851_225113118993537_3994758217496714008_n.jpg?tp=1&_nc_ht=instagram.fbau4-1.fna.fbcdn.net&_nc_ohc=K5uZoi2xS7sAX-GztvP&edm=AIQHJ4wAAAAA&ccb=7-4&oh=ee259bab71c6a66e78fa869d467a2a39&oe=609E7688&_nc_sid=7b02f1https://instagram.fbau4-1.fna.fbcdn.net/v/t51.2885-19/s150x150/131076851_225113118993537_3994758217496714008_n.jpg?tp=1&_nc_ht=instagram.fbau4-1.fna.fbcdn.net&_nc_ohc=K5uZoi2xS7sAX-GztvP&edm=AIQHJ4wAAAAA&ccb=7-4&oh=ee259bab71c6a66e78fa869d467a2a39&oe=609E7688&_nc_sid=7b02f1"
                details="Admin -#01F3DAT3EZN8BBDNCNYQKZKWKC, created 16/04/2021 09:34, updated 16/04/2021 09:34"
              ></RequestRow>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Requests;
