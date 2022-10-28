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
import { showNotification } from '@mantine/notifications';
import { IconCircleCheck, IconEdit, IconTrashX, IconX } from '@tabler/icons';
import { AxiosError } from 'axios';
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
  const [del, setDel] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const barcodeElement = document.getElementById('barcode');

  const persistName = async () => {
    setLoading(true);
    try {
      const response = await httpClient.put(`/products/${product?.code}`, {
        product_name: name,
      });
      showNotification({
        title: `success - ${response.status}`,
        message: 'product name updated!',
        icon: <IconCircleCheck />,
        color: 'green',
      });
    } catch (err) {
      const error = err as AxiosError;
      showNotification({
        title: `error - ${error.response!.status}`,
        // @ts-ignore - axios format
        message: error.response?.data.message,
        icon: <IconX />,
        color: 'red',
      });
    } finally {
      setLoading(false);
      setEdit(false);
      setDel(false);
      onClose();
    }
  };

  const trashProduct = async () => {
    setLoading(true);
    try {
      const response = await httpClient.delete(`/products/${product?.code}`);
      showNotification({
        title: `success - ${response.status}`,
        message: 'product trashed!',
        icon: <IconCircleCheck />,
        color: 'green',
      });
    } catch (err) {
      const error = err as AxiosError;
      showNotification({
        title: `error - ${error.response!.status}`,
        // @ts-ignore - axios format
        message: error.response?.data.message,
        icon: <IconX />,
        color: 'red',
      });
    } finally {
      setLoading(false);
      setEdit(false);
      setDel(false);
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
          <ActionIcon onClick={() => setDel(!del)}>
            <IconTrashX color='red' />
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
            onChange={(e) => setName(e.currentTarget.value.trim())}
            style={{ flex: 1 }}
            disabled={loading}
          />
          <Button
            onClick={persistName}
            loading={loading}
            disabled={!name.length}
          >
            OK
          </Button>
        </Group>
      </Dialog>
      <Dialog
        opened={del}
        withBorder
        withCloseButton
        size='lg'
        radius='md'
        onClose={() => setDel(false)}
        position={{ top: 20, left: 20 }}
      >
        <Text mb='sm'>Confirm trashing of product?</Text>
        <Group align='flex-end'>
          <Button onClick={trashProduct} loading={loading}>
            Yes
          </Button>
          <Button onClick={() => setDel(false)} loading={loading}>
            No
          </Button>
        </Group>
      </Dialog>
    </MantineModal>
  );
}
