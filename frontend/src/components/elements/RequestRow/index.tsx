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
    let name = request.user.name;
    let char = '';

    let nameArray = name.split(' ');

    let letters = 0;

    for (const index in nameArray) {
      if (letters == 2) {
        break;
      }

      char += nameArray[index].substr(0, 1).toUpperCase();

      letters++;
    }

    return char;
  };

  const getRequestStatus = (status: number) => {
    switch (status) {
      case 0:
        return 'Waiting';
      case 1:
        return 'Queued';
      case 2:
        return 'Declined';
      case 3:
        return 'Executed';
      default:
        break;
    }
  };

  return (
    <tr>
      <td>
        <div className="d-flex flex-row align-items-center">
          <RequestImage>{getFirstCharRequester()}</RequestImage>
          <Col className="d-flex flex-column">
            <RequestTitle onClick={() => showRequest()}>
              {request.description}
            </RequestTitle>
            <RequestDescription>{details()}</RequestDescription>
          </Col>
        </div>
      </td>
      <td>
        <RequestStatus>{getRequestStatus(request.status)}</RequestStatus>
      </td>
    </tr>
  );
};

export default RequestRow;
