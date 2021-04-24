import { Main } from './styles';

interface TitleProps {
  className?: string;
  title: string;
  description?: string;
}

const PageTitle: React.FC<TitleProps> = ({
  className,
  title,
  description,
}) => (
  <Main className={className}>
    <h3>{title}</h3>
    {
      description &&
      <p>{description}</p>
    }
  </Main>
);

export default PageTitle;
