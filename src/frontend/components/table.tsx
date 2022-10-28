import { Anchor, Button, Table as MantineTable } from '@mantine/core';
import { useState } from 'react';

import { Modal } from '#/frontend/components/modal';
import { Product } from '#/frontend/types/product';

interface TableProps {
  products: Product[];
}

export function Table({ products }: TableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modProd, setModProd] = useState<Product | undefined>(undefined);

  const openModal = (p: Product) => {
    setModProd(p);
    setModalOpen(true);
  };

  return (
    <MantineTable
      striped
      highlightOnHover
      withBorder
      horizontalSpacing='sm'
      verticalSpacing='sm'
      mb='sm'
    >
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
              <Button onClick={() => openModal(product)}>Details</Button>
            </td>
            <td align='center'>
              <Anchor
                href={product.url}
                size='xl'
                title='view page'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fa-solid fa-square-up-right' />
              </Anchor>
            </td>
          </tr>
        ))}
      </tbody>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        product={modProd}
      />
    </MantineTable>
  );
}
