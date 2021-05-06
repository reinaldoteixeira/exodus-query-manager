import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

interface BreadcrumbItem {
  active: boolean;
  href: string;
  text: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BreadCrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const router = useRouter();

  const redirect = (href: string) => {
    router.push(href);
  };

  return (
    <Breadcrumb>
      {items.map((item, index) => {
        let isActive = false;
        if (router.asPath == item.href) {
          isActive = true;
        }
        return (
          <Breadcrumb.Item
            key={index}
            active={isActive}
            onClick={() => redirect(item.href)}
          >
            {item.text}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
