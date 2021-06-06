import { useCallback } from 'react';

import { Container, Pagination } from './styles';

interface PaginateProps {
  total: number | null;
  filterTake: number;
  activePage: number;
  filterStatus: number;
  setActivePage: (value: number) => void;
  loadData: (filterStatus: number, filterSkip: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({
  total,
  filterTake,
  activePage,
  filterStatus,
  setActivePage,
  loadData,
}) => {
  if (total < filterTake) {
    return null;
  }

  const handleSetPage = useCallback(
    (pageSelected: number) => () => {
      const filterSkip = filterTake * (pageSelected - 1);
      loadData(filterStatus, filterSkip);
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
