import Auth from '../components/layouts/Auth/Auth';
import LoginPage from '../components/templates/Login/Login';

const Login: React.FC = () => {
  return (
    <Auth>
      <LoginPage />
    </Auth>
  );
};

export default Login;
