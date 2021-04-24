import { Card } from 'react-bootstrap';
import { Header } from './styles';

interface PanelProps {
  className?: string;
  title?: string;
}

const Panel: React.FC<PanelProps> = ({
  className,
  title,
  children,
}) => {
  return (
    <Card className={'shadow-sm ' + className}>
      {
        title &&
        <Header>{title}</Header>
      }
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};

export default Panel;
