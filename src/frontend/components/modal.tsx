import {
  ActionIcon,
  Button,
  Center,
  Dialog,
  Divider,
  Grid,
  Group,
  Image,
  Modal as MantineModal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import jsbarcode from 'jsbarcode';
import { useEffect, useState } from 'react';

import { Product } from '#/frontend/types/product';
import { httpClient } from '#/frontend/utils/http';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  product: Product | undefined;
}

export function Modal({ opened, onClose, product }: ModalProps) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const barcodeElement = document.getElementById('barcode');

  const persistName = async () => {
    setLoading(true);
    try {
      const response = await httpClient.put(`/products/${product?.code}`, {
        product_name: name,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setEdit(false);
      onClose();
    }
  };

  useEffect(() => {
    if (barcodeElement) {
      jsbarcode('#barcode', product?.barcode!.split(' ')[0]!);
    }
  }, [product, barcodeElement]);

  useEffect(() => {
    if (product?.product_name) setName(product?.product_name);
  }, [product, opened]);

  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      title={`code: ${product?.code}`}
      centered
      size='xl'
    >
      <Center>
        <Group spacing='xs' mb='md'>
          <Title order={3}>{product?.product_name}</Title>
          <ActionIcon onClick={() => setEdit(!edit)}>
            <IconEdit />
          </ActionIcon>
        </Group>
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
      <Dialog
        opened={edit}
        withBorder
        withCloseButton
        size='lg'
        radius='md'
        onClose={() => setEdit(false)}
        position={{ top: 20, left: 20 }}
      >
        <Text>Edit product name</Text>
        <Group align='flex-end'>
          <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            style={{ flex: 1 }}
            disabled={loading}
          />
          <Button onClick={persistName} loading={loading}>
            OK
          </Button>
        </Group>
      </Dialog>
    </MantineModal>
  );
}
