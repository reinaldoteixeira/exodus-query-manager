import { useRouter } from "next/router";
import { NavText, NavIcon } from "@trendmicro/react-sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faUser,
  faUsers,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { SideNav, NavItem } from "./styles";
import { useAuth } from "../../../hooks/auth";

interface SidebarProps {
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const router = useRouter();
  const { pathname } = router;

  const { user } = useAuth();

  const handleNavigation = (page: string) => {
    router.push(page);
  };

  return (
    <SideNav className="shadow-lg" onToggle={onToggle}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="/">
        <NavItem
          eventKey="/requests"
          active={pathname === "/"}
          onClick={() => {
            handleNavigation("/");
          }}
        >
          <NavIcon>
            <FontAwesomeIcon icon={faCodeBranch} />
          </NavIcon>
          <NavText>Requests</NavText>
        </NavItem>
        {user.role === 1 ? (
          <>
            <NavItem
              eventKey="/users"
              active={pathname === "/users"}
              onClick={() => {
                handleNavigation("/users");
              }}
            >
              <NavIcon>
                <FontAwesomeIcon icon={faUsers} />
              </NavIcon>
              <NavText>Users</NavText>
            </NavItem>
            <NavItem
              eventKey="/settings"
              active={pathname === "/settings"}
              onClick={() => {
                handleNavigation("/settings");
              }}
            >
              <NavIcon>
                <FontAwesomeIcon icon={faCog} />
              </NavIcon>
              <NavText>Settings</NavText>
            </NavItem>
          </>
        ) : (
          ""
        )}
        <NavItem
          eventKey="/account"
          active={pathname === `/account/${user.id}`}
          onClick={() => {
            handleNavigation(`/account/${user.id}`);
          }}
        >
          <NavIcon>
            <FontAwesomeIcon icon={faUser} />
          </NavIcon>
          <NavText>My Account</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidebar;
