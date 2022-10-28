import { Container, Pagination } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { Info } from '#/frontend/components/info';
import { Table } from '#/frontend/components/table';
import { ProductsResult } from '#/frontend/types/product';
import { ScanResult } from '#/frontend/types/scan';
import { httpClient } from '#/frontend/utils/http';

export function App() {
  const [page, setPage] = useState(1);
  const fetchData = () =>
    httpClient.get<ProductsResult>(`/products?page=${page}`);
  const fetchScan = () => httpClient.get<ScanResult>('');
  const products = useQuery(['products-cache', page], fetchData);
  const scan = useQuery('scan-cache', fetchScan, { refetchInterval: 1000 });

  return (
    <Container>
      <Info data={scan.data?.data || null} />
      <Table
        products={products.data?.data.data || []}
        refetch={products.refetch}
      />
      <Pagination
        disabled={products.isLoading}
        position='center'
        page={page}
        onChange={setPage}
        total={products.data?.data.totalPages || 0}
      />
    </Container>
  );
}
