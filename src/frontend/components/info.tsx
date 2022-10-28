import { Alert, Anchor, Grid } from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconInfoCircle,
  IconLoader,
} from '@tabler/icons';

import { ScanResult } from '#/frontend/types/scan';

interface InfoProps {
  data: ScanResult | null;
}

export function Info({ data }: InfoProps) {
  const iconSize = 16;
  let title = '';
  let text = '';
  let color = '';
  let icon = <IconAlertCircle size={iconSize} />;
  switch (data?.lastScan.status) {
    case 'FAILED':
      title = 'last scan failed';
      text = '';
      color = 'red';
      icon = <IconAlertCircle size={iconSize} />;
      break;
    case 'SUCCESS':
      title = 'last scan OK';
      text = data.lastScan.date.toString();
      color = 'green';
      icon = <IconCheck size={iconSize} />;
      break;
    case 'IN_PROGRESS':
      title = 'scan in progress...';
      text = '';
      color = 'cyan';
      icon = <IconLoader size={iconSize} />;
      break;
    default:
      break;
  }
  return (
    <Grid>
      <Grid.Col span={4}>
        <Alert
          mt='sm'
          mb='sm'
          title='coodesh challenge'
          color='gray'
          icon={<IconInfoCircle size={16} />}
        >
          mkvlrn@gmail.com
          <br />
          <Anchor
            href={`http://localhost:${process.env.BACKEND_PORT}/docs`}
            target='_blank'
            rel='noopener noreferrer'
          >
            api docs <i className='fa-solid fa-link' />
          </Anchor>
        </Alert>
      </Grid.Col>
      <Grid.Col span={4}>
        <Alert
          mt='sm'
          mb='sm'
          title='database'
          color='gray'
          icon={<IconInfoCircle size={16} />}
        >
          {data?.databaseOK && `OK | uptime: ${data.uptime}`}
          {!data?.databaseOK && 'DOWN'}
          <br />
          <Anchor
            href={`http://localhost:${process.env.BACKEND_PORT}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            healthcheck <i className='fa-solid fa-link' />
          </Anchor>
        </Alert>
      </Grid.Col>
      <Grid.Col span={4}>
        <Alert mt='sm' mb='sm' title={title} color={color} icon={icon}>
          {text}
          <br />
          {data?.lastScan.status === 'SUCCESS' &&
            `${data.lastScan.new_products} new products`}
        </Alert>
      </Grid.Col>
    </Grid>
  );
}
