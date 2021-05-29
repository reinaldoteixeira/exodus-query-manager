import { format } from 'sql-formatter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

import { Col, Container, Row, ListGroup, Tabs, Tab } from 'react-bootstrap';

import Explain from '../../modules/Explain';

import Breadcrumb from '../../elements/Breadcrumb';
import Loader from '../../elements/Loader';
import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';

import { RowPanel, Code, RequestInfo } from './styles';

import api from '../../../services/api';
import { RequestType } from '../../../@types';

interface DatabaseType {
  label: string;
  value: string;
}

const RequestDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [request, setRequest] = useState<RequestType>();

  const router = useRouter();
  const requestId = router.query.id;

  useEffect(() => {
    if (!request && requestId) {
      console.log('loadData');
      loadData(requestId);
    }
  }, [requestId]);

  const loadData = async (requestId: string | string[]) => {
    const response = await api.get<RequestType>(`requests/detail/${requestId}`);
    const request = response.data;
    setRequest(request);
  };

  if (!request) {
    return <Loader />;
  }

  const formatSql = (query: string) => {
    return format(query, {
      language: 'sql',
      indent: '\n',
      uppercase: true,
    });
  };

  const showDatabases = (databases: string) => {
    let databasesFormated = JSON.parse(databases);

    databasesFormated = databasesFormated.map((element: DatabaseType) => {
      return element.value;
    });

    return databasesFormated.join(' / ');
  };

  const showTimeToRun = (timeToRun: string) => {
    switch (timeToRun) {
      case 'anytime':
        return 'Anytime';
      case 'soon':
        return 'As soon as possible';
      case 'schedule':
        return 'Schedule time';
      case 'manual':
        return 'Manual';
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
      href: `/requests/${requestId}`,
      text: `${requestId}`,
    },
  ];

  return (
    <Container fluid className="p-0">
      <Row>
        <Col>
          <PageTitle
            title={`Request Details`}
            description="Show request details"
          />
          <Breadcrumb items={breadcrumb} />
        </Col>
      </Row>
      <RowPanel>
        <Panel className="request-details-tabs">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
          >
            <Tab eventKey="info" title="Info">
              <ListGroup>
                <ListGroup.Item>
                  Requester: <RequestInfo>{request.user.name}</RequestInfo>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: <RequestInfo>{request.description}</RequestInfo>
                </ListGroup.Item>
                <ListGroup.Item>
                  Created At:{' '}
                  <RequestInfo>
                    {moment(request.created_at).format('DD/MM/YYYY HH:mm:ss')}
                  </RequestInfo>
                </ListGroup.Item>
                <ListGroup.Item>
                  Host: <RequestInfo>{request.host}</RequestInfo>
                </ListGroup.Item>
                <ListGroup.Item>
                  Database(s):{' '}
                  <RequestInfo>{showDatabases(request.databases)}</RequestInfo>
                </ListGroup.Item>
                <ListGroup.Item>
                  Time to Run:{' '}
                  <RequestInfo>
                    {showTimeToRun(request.time_to_run)}
                  </RequestInfo>
                </ListGroup.Item>
                <ListGroup.Item>
                  Schedule:{' '}
                  <RequestInfo>
                    {moment(request.schedule).format('DD/MM/YYYY HH:mm') ||
                      'not configured'}
                  </RequestInfo>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="ddl" className="tab-code" title="DDL">
              <Code>{formatSql(request.ddl_command)}</Code>
            </Tab>
            <Tab eventKey="explain" title="Explain">
              <Explain requestId={requestId} databases={request.databases} />
            </Tab>
            <Tab eventKey="comments" title="Comments"></Tab>
          </Tabs>
        </Panel>
      </RowPanel>
    </Container>
  );
};

export default RequestDetails;
