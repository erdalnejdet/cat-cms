import React, { useState } from 'react';
import { Breadcrumb, Button, Card, Drawer, Form, Space, Typography, theme, Tag, Tooltip, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FolderOutlined, GlobalOutlined, FieldTimeOutlined } from '@ant-design/icons';
import type { ColDef } from 'ag-grid-community';
import DataGrid from '../../components/common/DataGrid';

import CreateCategory from './Create';
import EditCategory from './Edit';

const { Title, Text } = Typography;
const { useToken } = theme;

const initialData = [
  { id: 1, name: 'Haberler', slug: '/haberler', order: 1, status: true, lastUpdated: '2024-03-20' },
  { id: 2, name: 'Ürünler', slug: '/urunler', order: 2, status: true, lastUpdated: '2024-03-18' },
  { id: 3, name: 'Hizmetler', slug: '/hizmetler', order: 3, status: true, lastUpdated: '2024-03-15' },
  { id: 4, name: 'Blog', slug: '/blog', order: 4, status: false, lastUpdated: '2024-03-10' },
  { id: 5, name: 'Duyurular', slug: '/duyurular', order: 5, status: true, lastUpdated: '2024-03-05' },
];

const CategoryList: React.FC = () => {
  const { token } = useToken();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [form] = Form.useForm();

  const columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Kategori Adı',
      flex: 2,
      minWidth: 200,
      cellRenderer: (params: any) => (
        <Space size="middle">
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: token.colorPrimaryBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: token.colorPrimary
          }}>
            <FolderOutlined />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ fontSize: '14px' }}>{params.value}</Text>
            <Text type="secondary" style={{ fontSize: '11px' }}>ID: {params.data.id}</Text>
          </div>
        </Space>
      )
    },
    {
      field: 'slug',
      headerName: 'URL / Slug',
      flex: 1.5,
      minWidth: 150,
      cellRenderer: (params: any) => (
        <Tag icon={<GlobalOutlined />} color="processing" style={{ borderRadius: '4px' }}>
          {params.value}
        </Tag>
      )
    },
    {
      field: 'order',
      headerName: 'Sıra',
      flex: 0.8,
      minWidth: 80,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'status',
      headerName: 'Durum',
      flex: 1,
      minWidth: 120,
      cellRenderer: (params: any) => (
        <Tag color={params.value ? 'success' : 'error'} bordered={false} style={{ borderRadius: '12px', padding: '0 12px' }}>
          {params.value ? 'Aktif' : 'Pasif'}
        </Tag>
      )
    },
    {
      field: 'lastUpdated',
      headerName: 'Son Güncelleme',
      flex: 1,
      minWidth: 150,
      cellRenderer: (params: any) => (
        <Space size="small">
          <FieldTimeOutlined style={{ color: token.colorTextDescription }} />
          <Text style={{ fontSize: '13px' }}>{params.value}</Text>
        </Space>
      )
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      flex: 1,
      minWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => (
        <Space size="middle" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Tooltip title="Düzenle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(params.data)}
              style={{ color: token.colorPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Tooltip>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Bu kategoriyi silmek istediğinize emin misiniz?"
            onConfirm={() => console.log("Kategori siliniyor")}
            okText="Evet"
            cancelText="Hayır"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Sil">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      slug: category.slug.replace('/', ''),
      order: category.order,
      status: category.status,
    });
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const onSubmit = (values: any) => {
    console.log("Kategori kaydedildi:", values);
    onCloseDrawer();
  };

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
            <Title level={3} style={{ margin: '0 0 4px 0', color: token.colorText }}>İçerik Yönetimi</Title>
            <Breadcrumb
              items={[
                { title: 'Anasayfa' },
                { title: 'İçerik Yönetimi' },
                { title: 'Kategori Listesi' },
              ]}
            />
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{
              borderRadius: '10px',
              height: '46px',
              padding: '0 24px',
              fontWeight: '600',
              boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)'
            }}
          >
            Yeni Kategori Ekle
          </Button>
        </div>
      </Card>

      <Card
        styles={{
          header: { borderBottom: `1px solid ${token.colorBorderSecondary}`, padding: '16px 24px' },
          body: { padding: '0' }
        }}
        title={
          <Space>
            <div style={{
              width: '8px',
              height: '24px',
              background: token.colorPrimary,
              borderRadius: '4px'
            }} />
            <span style={{ fontSize: '18px', fontWeight: '700' }}>Kategoriler</span>
          </Space>
        }
        style={{
          borderRadius: '16px',
          borderColor: token.colorBorderSecondary,
          background: token.colorBgContainer,
          overflow: 'hidden',
          boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ padding: '24px' }}>
          <DataGrid rowData={initialData} columnDefs={columnDefs} />
        </div>
      </Card>

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '8px',
              background: token.colorPrimaryBg,
              borderRadius: '8px',
              color: token.colorPrimary
            }}>
              <FolderOutlined style={{ fontSize: '20px' }} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', lineHeight: 1.2 }}>{editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}</div>
              <div style={{ fontSize: '12px', color: token.colorTextDescription, fontWeight: 'normal' }}>
                Kategori bilgilerini buradan düzenleyebilirsiniz.
              </div>
            </div>
          </div>
        }
        placement="right"
        width={550}
        onClose={onCloseDrawer}
        open={drawerVisible}
        closeIcon={null}
        extra={
          <Button
            type="text"
            shape="circle"
            icon={<span style={{ fontSize: '20px' }}>&times;</span>}
            onClick={onCloseDrawer}
            style={{ color: token.colorTextDescription }}
          />
        }
        styles={{
          header: { padding: '24px', borderBottom: `1px solid ${token.colorBorderSecondary}` },
          body: { padding: '24px' },
          footer: { borderTop: `1px solid ${token.colorBorderSecondary}`, padding: '16px 24px' }
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button onClick={onCloseDrawer} size="large" style={{ borderRadius: '8px' }}>
              İptal
            </Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              size="large"
              style={{ padding: '0 32px', borderRadius: '8px', fontWeight: '600' }}
              icon={editingCategory ? <EditOutlined /> : <PlusOutlined />}
            >
              {editingCategory ? 'Güncelle' : 'Kaydet ve Yayınla'}
            </Button>
          </div>
        }
      >
        {editingCategory ? (
          <EditCategory form={form} onFinish={onSubmit} />
        ) : (
          <CreateCategory form={form} onFinish={onSubmit} />
        )}
      </Drawer>
    </div>
  );
};

export default CategoryList;
