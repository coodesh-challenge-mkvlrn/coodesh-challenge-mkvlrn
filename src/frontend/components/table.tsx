import { Anchor, Button, Table as MantineTable } from '@mantine/core';

import { Product } from '#/frontend/types/product';

interface TableProps {
  products: Product[];
}

export function Table({ products }: TableProps) {
  return (
    <MantineTable
      striped
      highlightOnHover
      withBorder
      horizontalSpacing='sm'
      verticalSpacing='sm'
      captionSide='top'
      style={{ marginTop: '2rem' }}
    >
      <caption>coodesh challenge - mkvlrn@gmail.com</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Import Date</th>
          <th>Details</th>
          <th>External</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.code}>
            <td>{product.product_name}</td>
            <td>{product.status}</td>
            <td>{product.imported_t.toString()}</td>
            <td>
              <Button>Details</Button>
            </td>
            <td>
              <Anchor href={product.url}>view page</Anchor>
            </td>
          </tr>
        ))}
      </tbody>
    </MantineTable>
  );
}
