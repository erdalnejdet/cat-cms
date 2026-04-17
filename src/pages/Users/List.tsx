import React, { useState } from 'react';
import { Breadcrumb, Button, Card, Drawer, Form, Space, Typography, theme, Tag, Tooltip, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import type { ColDef } from 'ag-grid-community';
import DataGrid from '../../components/common/DataGrid';
import CreateUser from './Create';
import EditUser from './Edit';

const { Title, Text } = Typography;
const { useToken } = theme;

const initialData = [
  { id: 1, name: 'MBC Admin', email: 'mbc@madebycat.com', username: 'mbc@madebycat.com', status: true, roles: ['admin'] },
];

const UserList: React.FC = () => {
  const { token } = useToken();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();

  const columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Adı Soyadı',
      flex: 1.5,
      minWidth: 150,
      cellRenderer: (params: any) => (
        <Space size="middle">
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: token.colorPrimaryBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: token.colorPrimary
          }}>
            <UserOutlined />
          </div>
          <Text strong>{params.value}</Text>
        </Space>
      )
    },
    {
      field: 'email',
      headerName: 'E-Posta',
      flex: 1.5,
      minWidth: 180,
      cellRenderer: (params: any) => (
        <Space size="small">
          <MailOutlined style={{ color: token.colorTextDescription }} />
          <Text>{params.value}</Text>
        </Space>
      )
    },
    {
      field: 'username',
      headerName: 'Kullanıcı Adı',
      flex: 1.5,
      minWidth: 180
    },
    {
      field: 'status',
      headerName: 'Aktif',
      flex: 0.8,
      minWidth: 100,
      cellRenderer: (params: any) => (
        <Tag color={params.value ? 'success' : 'error'} bordered={false} style={{ borderRadius: '12px' }}>
          {params.value ? 'Aktif' : 'Pasif'}
        </Tag>
      )
    },
    {
      field: 'actions',
      headerName: 'İşlem',
      flex: 0.8,
      minWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => (
        <Space size="middle">
          <Tooltip title="Düzenle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(params.data)}
              style={{ color: token.colorPrimary }}
            />
          </Tooltip>
          <Popconfirm
            title="Kullanıcıyı Sil"
            description="Bu kullanıcıyı silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(params.data.id)}
            okText="Evet"
            cancelText="Hayır"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Sil">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleEdit = (user: any) => {
    setEditingUser(user);
    const names = user.name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');

    form.setFieldsValue({
      firstName,
      lastName,
      email: user.email,
      username: user.username,
      roles: user.roles,
    });
    setDrawerVisible(true);
  };

  const handleDelete = (id: number) => {
    console.log("Kullanıcı siliniyor:", id);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const onSubmit = (values: any) => {
    console.log("Kullanıcı verisi:", values);
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
            <Title level={3} style={{ margin: '0 0 4px 0' }}>Kullanıcı Yönetimi</Title>
            <Breadcrumb items={[{ title: 'Anasayfa' }, { title: 'Sistem Yönetimi' }, { title: 'Kullanıcı Yönetimi' }]} />
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{
              borderRadius: '10px',
              height: '46px',
              fontWeight: '600',
              boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)'
            }}
          >
            Yeni Kullanıcı
          </Button>
        </div>
      </Card>

      <Card
        title={
          <Space>
            <div style={{ width: '8px', height: '24px', background: token.colorPrimary, borderRadius: '4px' }} />
            <span style={{ fontSize: '18px', fontWeight: '700' }}>Kullanıcı Listesi</span>
          </Space>
        }
        style={{ borderRadius: '16px', borderColor: token.colorBorderSecondary }}
        styles={{ body: { padding: '24px' } }}
      >
        <DataGrid rowData={initialData} columnDefs={columnDefs} />
      </Card>

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: token.colorPrimaryBg, borderRadius: '8px', color: token.colorPrimary }}>
              <UserOutlined style={{ fontSize: '20px' }} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>{editingUser ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Ekle'}</div>
              <div style={{ fontSize: '12px', color: token.colorTextDescription }}>Kullanıcı yetkilerini ve bilgilerini yönetin.</div>
            </div>
          </div>
        }
        placement="right"
        width={550}
        onClose={onCloseDrawer}
        open={drawerVisible}
        closeIcon={null}
        extra={<Button type="text" icon={<span style={{ fontSize: '20px' }}>&times;</span>} onClick={onCloseDrawer} />}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button onClick={onCloseDrawer} size="large">İptal</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              size="large"
              style={{ minWidth: '120px' }}
              icon={editingUser ? <EditOutlined /> : <PlusOutlined />}
            >
              {editingUser ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        }
      >
        {editingUser ? (
          <EditUser form={form} onFinish={onSubmit} />
        ) : (
          <CreateUser form={form} onFinish={onSubmit} />
        )}
      </Drawer>
    </div>
  );
};

export default UserList;

