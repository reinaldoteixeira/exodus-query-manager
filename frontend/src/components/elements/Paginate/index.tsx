import { useCallback } from 'react';

import { Container, Pagination } from './styles';

interface PaginateProps {
  total: number | null;
  filterTake: number;
  activePage: number;
  setFilterSkip: (value: number) => void;
  setActivePage: (value: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({
  total,
  filterTake,
  activePage,
  setFilterSkip,
  setActivePage,
}) => {
  if (total < filterTake) {
    return null;
  }

  const handleSetPage = useCallback(
    (pageSelected: number) => () => {
      setFilterSkip(filterTake * (pageSelected - 1));
      setActivePage(pageSelected);
    },
    []
  );

  let items = [];

  for (let number = 1; number <= total / filterTake; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={handleSetPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container>
      <Pagination>{items}</Pagination>
    </Container>
  );
};

export default Paginate;
