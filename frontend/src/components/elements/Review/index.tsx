import { Container, RequestImage } from './styles';
import { ReviewType } from '../../../@types';

import { OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';

interface ReviewProps {
  review: ReviewType;
  className: string;
  title: string;
}

const Review: React.FC<ReviewProps> = ({ review, className, title }) => {
  const getFirstCharUser = (name: string) => {
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

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>
        <p>User: {review.user.name}</p>
        <p>Date: {moment(review.created_at).format('DD/MM/YYYY HH:mm:ss')}</p>
        <p>Observation: {review.observation || 'No informations'}</p>
      </Popover.Content>
    </Popover>
  );

  return (
    <Container>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <RequestImage key={review.id} className={className}>
          {getFirstCharUser(review.user.name)}
        </RequestImage>
      </OverlayTrigger>
    </Container>
  );
};

export default Review;
