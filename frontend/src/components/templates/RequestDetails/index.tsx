import { format } from 'sql-formatter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

import {
  Col,
  Container,
  Row,
  ListGroup,
  Tabs,
  Tab,
  Button,
  Alert,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faStopCircle,
  faPlayCircle,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import Explain from '../../modules/Explain';

import Breadcrumb from '../../elements/Breadcrumb';
import Loader from '../../elements/Loader';
import ModalObservation from '../../elements/ModalObservation';
import PageTitle from '../../elements/PageTitle/PageTitle';
import Panel from '../../elements/Panel/Panel';

import { RowPanel, Code, RequestInfo, RowActions, RowAlert } from './styles';

import api from '../../../services/api';
import { RequestType, ReviewType } from '../../../@types';
import { useAuth } from '../../../hooks/auth';
import Review from '../../elements/Review';

interface DatabaseType {
  label: string;
  value: string;
}

const RequestDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [request, setRequest] = useState<RequestType>();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [requestId, setRequestId] = useState<string | string[]>();
  const [showLoader, setShowLoader] = useState(false);

  const [approved, setApproved] = useState(null);
  const [requestChanges, setRequestChanges] = useState(null);

  const [approveDisabled, setApproveDisabled] = useState(false);
  const [changesDisabled, setChangesDisabled] = useState(false);
  const [executeDisabled, setExecuteDisabled] = useState(false);
  const [declineDisabled, setDeclineDisabled] = useState(false);

  const [showModalObservation, setShowModalObservation] = useState(false);
  const handleCloseModalObservation = () => setShowModalObservation(false);
  const handleShowModalObservation = () => setShowModalObservation(true);

  const router = useRouter();
  const requestIdParam = router.query.id;

  const { user } = useAuth();

  useEffect(() => {
    if (!request && requestIdParam) {
      loadData(requestIdParam);
    }
  }, [requestIdParam]);

  const loadData = async (requestId: string | string[]) => {
    const response = await api.get<RequestType>(`requests/detail/${requestId}`);
    const request = response.data;

    setShowModalObservation(false);
    setRequest(request);
    setReviews(request.reviews);
    checkReviews(request.reviews);
    setRequestId(requestId);

    if (request.status != 0) {
      setApproveDisabled(true);
      setChangesDisabled(true);
      setExecuteDisabled(true);
      setDeclineDisabled(true);
    }
  };

  const checkReviews = (reviews: ReviewType[]) => {
    let hasApproved = null;
    let hasRequestChanges = null;

    reviews.map((review) => {
      if (review.action == 1 && review.user.id === user.id) {
        hasApproved = review.id;
      }
      if (review.action == 2 && review.user.id === user.id) {
        hasRequestChanges = review.id;
      }
    });

    if (hasApproved) {
      setApproved(hasApproved);
      setChangesDisabled(true);
    } else {
      setChangesDisabled(false);
      setApproved(null);
    }

    if (hasRequestChanges) {
      setRequestChanges(hasRequestChanges);
      setApproveDisabled(true);
    } else {
      setApproveDisabled(false);
      setRequestChanges(null);
    }
  };

  if (!request) {
    return <Loader />;
  }

  const handleCreateReview = async (
    action: number,
    observation: null | string
  ) => {
    setShowLoader(true);
    try {
      await api.post(`reviews/`, {
        requestId: requestId,
        userId: user.id,
        action,
        observation,
      });
      setShowLoader(false);
      loadData(requestId);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };

  const handleDeleteReview = async (action: number) => {
    setShowLoader(true);
    try {
      let id = approved;

      if (action == 2) {
        id = requestChanges;
      }

      await api.delete(`reviews/${id}`);
      setShowLoader(false);
      loadData(requestId);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };

  const handleExecute = async () => {
    setShowLoader(true);
    try {
      await api.patch(`requests/edit/${requestId}`, {
        status: 1,
      });
      setShowLoader(false);
      loadData(requestId);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };

  const handleDecline = async () => {
    setShowLoader(true);
    try {
      await api.patch(`requests/edit/${requestId}`, {
        status: 2,
      });
      setShowLoader(false);
      loadData(requestId);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };

  const handleEditRequest = () => {
    router.push(`/requests/edit/${requestIdParam}`);
  };

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
      {showLoader && <Loader />}
      <Row>
        <Col>
          <PageTitle
            title={`Request Details`}
            description="Show request details"
          />
          <Breadcrumb items={breadcrumb} />
        </Col>
      </Row>
      <RowAlert>
        {request.status === 1 ? (
          <Alert variant="info">This request was sent to the queue</Alert>
        ) : (
          ''
        )}
        {request.status === 2 ? (
          <Alert variant="danger">This request was refused</Alert>
        ) : (
          ''
        )}
        {request.status === 3 ? (
          <Alert variant="success">This request was executed</Alert>
        ) : (
          ''
        )}
      </RowAlert>
      <RowActions>
        <Panel title="Reviewers" className="request-reviewers">
          {reviews.length
            ? reviews.map((review) => {
                if (review.action === 1) {
                  return (
                    <Review
                      key={review.id}
                      review={review}
                      className="approve"
                      title="Approved"
                    />
                  );
                }
                if (review.action === 2) {
                  return (
                    <Review
                      key={review.id}
                      review={review}
                      className="request-changes"
                      title="Request Changes"
                    />
                  );
                }
              })
            : 'No one has reviewed it yet'}
        </Panel>
        <Panel className="request-actions">
          {user.id === request.user.id ? (
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleEditRequest()}
            >
              <FontAwesomeIcon icon={faEdit} /> Edit request
            </Button>
          ) : (
            ''
          )}
          {!approved ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleCreateReview(1, null)}
              disabled={approveDisabled}
            >
              <FontAwesomeIcon icon={faCheckCircle} /> Approve
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleDeleteReview(1)}
            >
              <FontAwesomeIcon icon={faCheckCircle} /> Unapprove
            </Button>
          )}
          {!requestChanges ? (
            <>
              <ModalObservation
                handleCloseModalObservation={handleCloseModalObservation}
                handleCreateReview={handleCreateReview}
                showModalObservation={showModalObservation}
              />
              <Button
                size="sm"
                variant="secondary"
                className="btn-changes"
                onClick={handleShowModalObservation}
                disabled={changesDisabled}
              >
                <FontAwesomeIcon icon={faStopCircle} /> Request changes
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              className="btn-changes"
              onClick={() => handleDeleteReview(2)}
              disabled={changesDisabled}
            >
              <FontAwesomeIcon icon={faStopCircle} /> Remove request changes
            </Button>
          )}
          {user.role === 1 ? (
            <>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExecute()}
                disabled={executeDisabled}
              >
                <FontAwesomeIcon icon={faPlayCircle} /> Send queue
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="btn-deny"
                onClick={() => handleDecline()}
                disabled={declineDisabled}
              >
                <FontAwesomeIcon icon={faTimesCircle} /> Decline
              </Button>
            </>
          ) : (
            ''
          )}
        </Panel>
      </RowActions>
      <RowPanel>
        <Panel className="request-details-tabs">
          <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
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
                  Host:{' '}
                  <RequestInfo>
                    {request.host.split(':')[0] || request.host}
                  </RequestInfo>
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
                    {request.schedule
                      ? moment(request.schedule).format('DD/MM/YYYY HH:mm')
                      : 'not configured'}
                  </RequestInfo>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="ddl" className="tab-code" title="DDL">
              <Code>{formatSql(request.ddl_command)}</Code>
            </Tab>
            {user.role <= 2 ? (
              <Tab eventKey="explain" title="Explain">
                <Explain requestId={requestId} databases={request.databases} />
              </Tab>
            ) : (
              ''
            )}
          </Tabs>
        </Panel>
      </RowPanel>
    </Container>
  );
};

export default RequestDetails;
