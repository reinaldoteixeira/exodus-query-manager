import moment from 'moment';
import { Col } from 'react-bootstrap';
import { useRouter } from 'next/router';

import { RequestType } from '../../../@types';

import {
  RequestTitle,
  RequestDescription,
  RequestStatus,
  RequestImage,
} from './styles';

interface RowProps {
  request: RequestType;
}

const RequestRow: React.FC<RowProps> = ({ request }) => {
  const router = useRouter();

  const requestId = request.id;

  const details = () => {
    return `${request.user.name} - #${request.id}, created ${moment(
      request.created_at
    ).format('DD/MM/YYYY HH:mm')}`;
  };

  const showRequest = () => {
    router.push(`/requests/${requestId}`);
  };

  const getFirstCharRequester = () => {
    return request.user.name.substr(0, 1).toUpperCase();
  };

  return (
    <tr>
      <td>
        <div className="d-flex flex-row align-items-center">
          <RequestImage>{getFirstCharRequester()}</RequestImage>
          <Col className="d-flex flex-column">
            <RequestTitle onClick={() => showRequest()}>
              query-{requestId}
            </RequestTitle>
            <RequestDescription>{details()}</RequestDescription>
          </Col>
        </div>
      </td>
      <td>
        <RequestStatus>Waiting</RequestStatus>
      </td>
    </tr>
  );
};

export default RequestRow;
