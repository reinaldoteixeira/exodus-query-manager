import { Container, Spinner } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <Spinner animation="border" role="status"></Spinner>
    </Container>
  );
};

export default Loader;
