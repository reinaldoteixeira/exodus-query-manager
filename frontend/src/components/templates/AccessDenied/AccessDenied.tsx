import Auth from '../../layouts/Auth/Auth';
import { Container } from './styles';

const AccessDenied: React.FC = () => (
  <Auth>
    <Container>
      <h1>Access Denied</h1>
      <p>
        <a href="/login">You must be signed in to view this page</a>
      </p>
    </Container>
  </Auth>
);

export default AccessDenied;
