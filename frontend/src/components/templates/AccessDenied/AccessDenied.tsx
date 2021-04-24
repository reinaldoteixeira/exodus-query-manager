import Auth from '../../layouts/Auth/Auth';

const AccessDenied: React.FC = () => (
  <Auth>
    <h1>Access Denied</h1>
    <p>
      <a href="/login">You must be signed in to view this page</a>
    </p>
  </Auth>
);

export default AccessDenied;
