import { useRouter } from 'next/router';
import { Col, Image, Row } from 'react-bootstrap';

import { RequestTitle, RequestDescription, RequestStatus } from './styles';

interface RowProps {
  id: string;
  requesterImage: string;
  details: string;
}

const RequestRow: React.FC<RowProps> = ({ id, details, requesterImage }) => {
  const router = useRouter();

  const showRequest = (id) => {
    router.push(`/${id}`);
  };

  return (
    <tr>
      <td>
        <div className="d-flex flex-row align-items-center">
          <div>
            <Image src={requesterImage} height={40} roundedCircle />
          </div>
          <Col className="d-flex flex-column">
            <RequestTitle onClick={() => showRequest(id)}>
              query-{id}
            </RequestTitle>
            <RequestDescription>{details}</RequestDescription>
          </Col>
        </div>
      </td>
      <td>
        <RequestStatus>Waiting</RequestStatus>
      </td>
      <td>
        <Row className="justify-content-center">
          <Image
            src="https://instagram.fbau4-1.fna.fbcdn.net/v/t51.2885-19/s150x150/69251486_522496421858361_7467891312386113536_n.jpg?tp=1&_nc_ht=instagram.fbau4-1.fna.fbcdn.net&_nc_ohc=HAlypEJXrMIAX9b1vi2&edm=ABfd0MgAAAAA&ccb=7-4&oh=bfa7973a73f55e3f755d817ebd75812e&oe=609EF9C3&_nc_sid=7bff83"
            height={30}
            roundedCircle
          />
          <Image
            src="https://instagram.fbau4-1.fna.fbcdn.net/v/t51.2885-19/s150x150/144093059_1046655125812780_1636496727770895107_n.jpg?tp=1&_nc_ht=instagram.fbau4-1.fna.fbcdn.net&_nc_ohc=8s3jPcHtZrcAX844UcX&edm=ABfd0MgAAAAA&ccb=7-4&oh=6fdbecebcf04ebf09b6cf237a300c577&oe=609EFD9A&_nc_sid=7bff83"
            height={30}
            roundedCircle
          />
        </Row>
      </td>
    </tr>
  );
};

export default RequestRow;
