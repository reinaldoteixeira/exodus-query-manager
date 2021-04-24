import { useState } from 'react';
import { Main, Content } from './styles';
import Sidebar from '../../modules/Sidebar/Sidebar';
import Topbar from '../../modules/Topbar/Topbar';

const Default: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Main fluid>
      <Sidebar onToggle={toggleSidebar} />
      <Topbar open={open} />
      <Content fluid>
        {children}
      </Content>
    </Main>
  );
};

export default Default;
