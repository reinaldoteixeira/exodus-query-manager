import { useRouter } from 'next/router';
import { NavText, NavIcon } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SideNav, NavItem } from './styles';

interface SidebarProps {
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const router = useRouter();
  const { pathname } = router;

  const handleNavigation = (page: string) => {
    router.push(page);
  };

  return (
    <SideNav className="shadow-lg" onToggle={onToggle}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="/">
        <NavItem
          eventKey="requests"
          active={pathname === '/'}
          onClick={() => {
            handleNavigation('/');
          }}
        >
          <NavIcon>
            <FontAwesomeIcon icon={faCodeBranch} />
          </NavIcon>
          <NavText>Requests</NavText>
        </NavItem>
        <NavItem
          eventKey="/users"
          active={pathname === '/users'}
          onClick={() => {
            handleNavigation('/users');
          }}
        >
          <NavIcon>
            <FontAwesomeIcon icon={faUsers} />
          </NavIcon>
          <NavText>Users</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidebar;
