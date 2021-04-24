import { Nav } from 'react-bootstrap';
import { Navbar } from './styles';
import Profile from '../Profile/Profile';

interface TopbarProps {
  open: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ open }) => {
  return (
    <Navbar className={(open ? 'open' : '') + ' shadow'}>
      <Navbar.Brand className="font-weight-bold">
        Exodus Query Manager
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id="topbar" className="justify-content-end">
        <Nav>
          <Profile />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;
