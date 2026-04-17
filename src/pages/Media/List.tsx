import React from 'react';
import { Breadcrumb, Button, Card, Input, Space, Typography, theme, Tooltip, Image, message } from 'antd';
import { FileImageOutlined, SearchOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import type { ColDef } from 'ag-grid-community';
import DataGrid from '../../components/common/DataGrid';

const { Title, Text } = Typography;
const { useToken } = theme;

const initialData = [
  { id: 1, type: 'RichTextMedia', preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop', url: 'https://genvera.madebycatdev.com/assets/img/ico/stats-compass.svg' },
  { id: 2, type: 'RichTextMedia', preview: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop', url: 'https://genvera.madebycatdev.com/assets/img/ico/stats-energy.svg' },
  { id: 3, type: 'ProductGallery', preview: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=100&h=100&fit=crop', url: 'https://genvera.madebycatdev.com/assets/img/products/item-01.jpg' },
  { id: 4, type: 'RichTextMedia', preview: 'https://images.unsplash.com/photo-1614850702361-ec880291932b?w=100&h=100&fit=crop', url: 'https://genvera.madebycatdev.com/assets/img/ico/stats-office.svg' },
  { id: 5, type: 'BannerImage', preview: 'https://images.unsplash.com/photo-1620121692029-d088224efc74?w=100&h=100&fit=crop', url: 'https://genvera.madebycatdev.com/assets/img/banners/main-bg.png' },
  { id: 6, type: 'RichTextMedia', preview: 'https://images.unsplash.com/photo-1618005198919-d346b2e35797?w=100&h=100&fit=crop', url: 'https://genvera.madebycatdev.com/assets/img/ico/stats-gold.svg' },
];

const MediaList: React.FC = () => {
  const { token } = useToken();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    message.success('URL kopyalandı!');
  };

  const columnDefs: ColDef[] = [
    {
      field: 'type',
      headerName: 'Tip',
      flex: 1,
      minWidth: 150,
      cellRenderer: (params: any) => (
        <Text strong style={{ color: token.colorTextSecondary }}>{params.value}</Text>
      )
    },
    {
      field: 'preview',
      headerName: 'Resim',
      width: 120,
      cellRenderer: (params: any) => (
        <div style={{ padding: '4px 0' }}>
          <Image
            src={params.value}
            width={40}
            height={40}
            style={{ borderRadius: '6px', objectFit: 'cover', border: `1px solid ${token.colorBorderSecondary}` }}
            placeholder={true}
          />
        </div>
      )
    },
    {
      field: 'url',
      headerName: 'Dosya URL',
      flex: 2,
      minWidth: 300,
      cellRenderer: (params: any) => (
        <Space size="small">
          <LinkOutlined style={{ color: token.colorPrimary, fontSize: '12px' }} />
          <Text
            ellipsis
            type="secondary"
            style={{ fontSize: '13px' }}
          >
            {params.value}
          </Text>
        </Space>
      )
    },
    {
      field: 'actions',
      headerName: 'İşlem',
      width: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => (
        <Space size="middle">
          <Tooltip title="URL Kopyala">
            <Button
              type="text"
              icon={<LinkOutlined />}
              onClick={() => handleCopy(params.data.url)}
              style={{ color: token.colorPrimary }}
            />
          </Tooltip>
          <Tooltip title="Görüntüle">
            <Button type="text" icon={<EyeOutlined />} style={{ color: token.colorTextSecondary }} />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      <Card
        className="global-card-gradient"
        styles={{ body: { padding: '20px 24px' } }}
        style={{
          borderRadius: '16px',
          border: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={3} style={{ margin: '0 0 4px 0' }}>Dosya Yönetimi</Title>
            <Breadcrumb items={[{ title: 'Anasayfa' }, { title: 'Dosya Yönetimi' }, { title: 'Medya Listesi' }]} />
          </div>
          <Input
            placeholder="Dosya ara..."
            prefix={<SearchOutlined style={{ color: token.colorTextPlaceholder }} />}
            style={{ width: 300, borderRadius: '10px', height: '40px' }}
            size="large"
          />
        </div>
      </Card>

      <Card
        styles={{
          header: { borderBottom: `1px solid ${token.colorBorderSecondary}`, padding: '16px 24px' },
          body: { padding: '24px' }
        }}
        title={
          <Space>
            <FileImageOutlined style={{ color: token.colorPrimary, fontSize: '20px' }} />
            <span style={{ fontSize: '18px', fontWeight: '700' }}>Medya Listesi</span>
          </Space>
        }
        style={{
          borderRadius: '16px',
          borderColor: token.colorBorderSecondary,
          boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
        }}
      >
        <DataGrid rowData={initialData} columnDefs={columnDefs} />
      </Card>

    </div>
  );
};

export default MediaList;
