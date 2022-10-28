import { Container } from '@mantine/core';
// import { useState } from 'react';
import { useQuery } from 'react-query';

import { Table } from '#/frontend/components/table';
import { httpClient } from '#/frontend/utils/http';

export function App() {
  // const [page, _setPage] = useState(1);
  const fetchData = () => httpClient.get(`/products?page=${1}`);
  // const fetchScan = () => httpClient.get('');
  const products = useQuery('products-cache', fetchData);
  // const _scan = useQuery('scan-cache', fetchScan);

  return (
    <Container>
      {!products.isLoading && <Table products={products.data?.data.data} />}
    </Container>
  );
}
