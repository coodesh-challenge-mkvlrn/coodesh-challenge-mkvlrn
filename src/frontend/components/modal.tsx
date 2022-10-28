import {
  Center,
  Divider,
  Grid,
  Image,
  Modal as MantineModal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import jsbarcode from 'jsbarcode';
import { useEffect } from 'react';

import { Product } from '#/frontend/types/product';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  product: Product | undefined;
}

export function Modal({ opened, onClose, product }: ModalProps) {
  const barcodeElement = document.getElementById('barcode');
  useEffect(() => {
    if (barcodeElement) {
      jsbarcode('#barcode', product?.barcode!.split(' ')[0]!);
    }
  }, [product, barcodeElement]);

  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      title={`code: ${product?.code}`}
      centered
      size='xl'
    >
      <Center>
        <Title order={3} mb='md'>
          {product?.product_name}
        </Title>
      </Center>
      <Grid>
        <Grid.Col span={6}>
          <Image src={product?.image_url} withPlaceholder />
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack spacing='xs' mb='xl'>
            <Text weight={700}>Quantity:</Text>
            <Text>{product?.quantity}</Text>
          </Stack>
          <Divider mb='lg' />
          <Stack spacing='xs' mb='xl'>
            <Text weight={700}>Packaging:</Text>
            <Text>{product?.packaging}</Text>
          </Stack>
          <Divider mb='lg' />
          <Stack spacing='xs' mb='xl'>
            <Text weight={700}>Brands:</Text>
            <Text>{product?.brands}</Text>
          </Stack>
          <Divider mb='lg' />
          <Stack spacing='xs' mb='xl'>
            <Text weight={700}>Categories:</Text>
            <Text>{product?.categories}</Text>
          </Stack>
          <Divider mb='lg' />
          <Stack spacing='xs' mb='xl'>
            <Text weight={700}>Bar Code:</Text>
            <svg id='barcode' />
          </Stack>
        </Grid.Col>
      </Grid>
    </MantineModal>
  );
}
