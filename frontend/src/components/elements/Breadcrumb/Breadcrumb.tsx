import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface BreadcrumbItem {
  active: boolean;
  href: string;
  text: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
}) => {
  return (
    <div>
      {items.map((item, index) => {
        <span>{item.text}</span>
        if (index === items.length - 1) {
          <FontAwesomeIcon icon={faChevronRight} />
        }
      })}
    </div>
  );
};

export default Breadcrumb;
