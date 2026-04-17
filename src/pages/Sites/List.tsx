import React, { useState } from 'react';
import { Breadcrumb, Button, Card, Drawer, Form, Input, Space, Typography, theme, Tooltip, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, GlobalOutlined, LinkOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { ColDef } from 'ag-grid-community';
import DataGrid from '../../components/common/DataGrid';

const { Title, Text } = Typography;
const { useToken } = theme;

const initialData = [
  { id: 1, site: 'Genvera Enerji', url: 'https://genvera.madebycatdev.com', url_listesi: 'genvera.com', klasor: 'genvera', asset_yolu: 'assets/genvera' },
  { id: 2, site: 'Tech Solutions', url: 'https://tech.madebycatdev.com', url_listesi: 'tech.com', klasor: 'tech', asset_yolu: 'assets/tech' },
  { id: 3, site: 'Green Energy', url: 'https://green.madebycatdev.com', url_listesi: 'green.com', klasor: 'green_energy', asset_yolu: 'assets/green_energy' },
];

const SiteList: React.FC = () => {
  const { token } = useToken();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  
  const columnDefs: ColDef[] = [
    { 
      field: 'site', 
      headerName: 'Site İsmi', 
      flex: 1.5, 
      minWidth: 180,
      cellRenderer: (params: any) => (
        <Space size="middle">
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            background: token.colorInfoBg, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: token.colorInfo 
          }}>
            <GlobalOutlined />
          </div>
          <Text strong>{params.value}</Text>
        </Space>
      )
    },
    { 
      field: 'url', 
      headerName: 'Erişim Adresi', 
      flex: 1.5, 
      minWidth: 220,
      cellRenderer: (params: any) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer" style={{ color: token.colorPrimary, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <LinkOutlined style={{ fontSize: '12px' }} />
          {params.value.replace('https://', '')}
        </a>
      )
    },
    { 
      field: 'klasor', 
      headerName: 'Klasör', 
      flex: 1, 
      minWidth: 120,
      cellRenderer: (params: any) => (
        <Tag icon={<FolderOpenOutlined />} color="default" style={{ borderRadius: '4px' }}>
          {params.value}
        </Tag>
      )
    },
    { 
      field: 'actions', 
      headerName: 'İşlemler', 
      flex: 0.8,
      minWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: () => (
        <Space size="middle">
          <Tooltip title="Düzenle">
            <Button type="text" icon={<EditOutlined />} style={{ color: token.colorPrimary }} />
          </Tooltip>
          <Popconfirm
            title="Siteyi Sil"
            description="Bu siteyi silmek istediğinize emin misiniz?"
            onConfirm={() => console.log("Site siliniyor")}
            okText="Evet"
            cancelText="Hayır"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Sil">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <Card 
        className="global-card-gradient"
        styles={{ body: { padding: '20px 24px' } }}
        style={{ borderRadius: '16px', border: `1px solid ${token.colorBorderSecondary}` }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={3} style={{ margin: '0 0 4px 0' }}>Sistem Yönetimi</Title>
            <Breadcrumb items={[{ title: 'Anasayfa' }, { title: 'Sistem Yönetimi' }, { title: 'Site Yönetimi' }]} />
          </div>
          <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />} 
            onClick={() => setDrawerVisible(true)}
            style={{ borderRadius: '10px', height: '46px', fontWeight: 'bold' }}
          >
            Yeni Site Tanımla
          </Button>
        </div>
      </Card>

      <Card 
        title={<span style={{ fontSize: '18px', fontWeight: '700' }}>Aktif Siteler</span>}
        style={{ borderRadius: '16px', borderColor: token.colorBorderSecondary }}
        styles={{ body: { padding: '24px' } }}
      >
        <DataGrid rowData={initialData} columnDefs={columnDefs} />
      </Card>

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: token.colorInfoBg, borderRadius: '8px', color: token.colorInfo }}>
              <GlobalOutlined style={{ fontSize: '20px' }} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>Site Yapılandırması</div>
              <div style={{ fontSize: '12px', color: token.colorTextDescription, fontWeight: '400' }}>Yeni site detaylarını girin.</div>
            </div>
          </div>
        }
        placement="right"
        width={500}
        onClose={onCloseDrawer}
        open={drawerVisible}
        closeIcon={null}
        extra={<Button type="text" icon={<span style={{ fontSize: '20px' }}>&times;</span>} onClick={onCloseDrawer} />}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button onClick={onCloseDrawer} size="large">İptal</Button>
            <Button type="primary" size="large" onClick={() => form.submit()} style={{ padding: '0 32px' }}>Kaydet</Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="site" label="Site İsmi" rules={[{ required: true }]}>
            <Input placeholder="Örn: Genvera Enerji" size="large" />
          </Form.Item>
          <Form.Item name="url" label="Web Adresi" rules={[{ required: true }]}>
            <Input placeholder="https://..." size="large" />
          </Form.Item>
          <Form.Item name="klasor" label="Klasör Adı">
            <Input placeholder="örn: genvera" size="large" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default SiteList;
