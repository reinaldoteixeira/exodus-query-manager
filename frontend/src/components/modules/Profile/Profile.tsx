import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Main } from './styles';

const Profile: React.FC = () => {
  const profileRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Main ref={profileRef} onClick={handleToggle}>
      <span>User name</span>
      {
        open &&
        <ul className="shadow-sm">
          <li>
            <span className="icon">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
            <span>Logout</span>
          </li>
        </ul>
      }
    </Main>
  );
};

export default Profile;
