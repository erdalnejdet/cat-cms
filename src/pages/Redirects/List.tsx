import React, { useState } from 'react';
import { Breadcrumb, Button, Card, Drawer, Form, Input, Space, Typography, theme, Upload, Select, Divider, Alert, Tooltip, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileExcelOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColDef } from 'ag-grid-community';
import DataGrid from '../../components/common/DataGrid';

const { Title, Text } = Typography;
const { useToken } = theme;
const { Option } = Select;

const initialData = [
  { id: 1, source: '/eski-urun-adresi', target: '/yeni-urun-adresi', type: '301', status: 'Aktif' },
  { id: 2, source: '/kampanya', target: '/indirimli-urunler', type: '302', status: 'Aktif' },
  { id: 3, source: '/blog/eski-yazi', target: '/blog/yeni-yazi', type: '301', status: 'Pasif' },
  { id: 4, source: '/hakkimizda-eski', target: '/hakkimizda', type: '301', status: 'Aktif' },
  { id: 5, source: '/iletisim-formu', target: '/bize-ulasin', type: '302', status: 'Aktif' },
];

const RedirectList: React.FC = () => {
  const { token } = useToken();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [importDrawerVisible, setImportDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  
  const columnDefs: ColDef[] = [
    { field: 'source', headerName: 'Kaynak URL', flex: 2, minWidth: 200 },
    { field: 'target', headerName: 'Hedef URL', flex: 2, minWidth: 200 },
    { 
      field: 'type', 
      headerName: 'Tip', 
      flex: 1, 
      minWidth: 100,
      cellRenderer: (params: any) => (
        <span style={{ 
          background: params.value === '301' ? '#f0fdf4' : '#eff6ff', 
          color: params.value === '301' ? '#166534' : '#1e40af',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {params.value}
        </span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Durum', 
      flex: 1, 
      minWidth: 120,
      cellRenderer: (params: any) => (
        <Space size="small">
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: params.value === 'Aktif' ? '#10b981' : '#ef4444' 
          }} />
          <span>{params.value}</span>
        </Space>
      )
    },
    { 
      field: 'actions', 
      headerName: 'İşlem', 
      flex: 1,
      minWidth: 100,
      sortable: false,
      filter: false,
      cellRenderer: () => (
        <Space size="middle" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Tooltip title="Düzenle">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              style={{ color: token.colorPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            />
          </Tooltip>
          <Popconfirm
            title="Yönlendirmeyi Sil"
            description="Bu yönlendirmeyi silmek istediğinize emin misiniz?"
            onConfirm={() => console.log("Yönlendirme siliniyor")}
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

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const onSubmit = (values: any) => {
    console.log("Yeni yönlendirme eklendi:", values);
    onCloseDrawer();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <Card 
        bodyStyle={{ padding: '20px 24px' }} 
        className="global-card-gradient"
        style={{ 
          borderRadius: '12px', 
          border: `1px solid ${token.colorBorderSecondary}`, 
        }}
      >
        <Title level={3} style={{ margin: '0 0 8px 0', color: token.colorText }}>Sistem Yönetimi</Title>
        <Breadcrumb 
          items={[
            { title: 'Anasayfa' },
            { title: 'Sistem Yönetimi' },
            { title: 'Yönlendirme Listesi' },
          ]}
        />
      </Card>

      <Card 
        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Yönlendirme Listesi</span>}
        extra={
          <Space>
            <Button 
              icon={<FileExcelOutlined />} 
              onClick={() => setImportDrawerVisible(true)}
              style={{ borderRadius: '8px' }}
            >
              Excel İçeri Aktar
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => setDrawerVisible(true)}
              style={{ backgroundColor: '#10b981', borderColor: '#10b981', fontWeight: 'bold' }}
            >
              Yeni Yönlendirme
            </Button>
          </Space>
        }
        style={{ 
          borderRadius: '12px', 
          borderColor: token.colorBorderSecondary,
          background: token.colorBgContainer 
        }}
      >
        <DataGrid rowData={initialData} columnDefs={columnDefs} />
      </Card>

      {/* Tekli Ekleme Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Yeni Yönlendirme Ekle</span>
            <Text type="secondary" style={{ fontSize: '12px' }}>Tekil bir URL yönlendirmesini hızlıca tanımlayın.</Text>
          </div>
        }
        placement="right"
        width={500}
        onClose={onCloseDrawer}
        open={drawerVisible}
        closeIcon={null}
        extra={
          <Button 
            type="text" 
            icon={<span style={{ fontSize: '20px' }}>&times;</span>} 
            onClick={onCloseDrawer}
            style={{ color: token.colorTextDescription }}
          />
        }
        styles={{ 
          header: { padding: '24px' }, 
          body: { padding: '24px' },
          footer: { borderTop: `1px solid ${token.colorBorderSecondary}`, padding: '16px 24px' }
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button onClick={onCloseDrawer}>İptal</Button>
            <Button type="primary" onClick={() => form.submit()} style={{ backgroundColor: '#10b981', borderColor: '#10b981', fontWeight: 'bold' }}>
              Ekle
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item name="source" label="Kaynak URL" rules={[{ required: true }]} tooltip="Eski veya yönlendirilecek adres">
            <Input placeholder="/eski-url" size="large" />
          </Form.Item>
          
          <Form.Item name="target" label="Hedef URL" rules={[{ required: true }]} tooltip="Yönlendirilecek yeni adres">
            <Input placeholder="/yeni-url" size="large" />
          </Form.Item>

          <Space style={{ display: 'flex', width: '100%', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <Form.Item name="type" label="Yönlendirme Tipi" initialValue="301" style={{ marginBottom: '8px' }}>
                <Select size="large">
                  <Option value="301">301</Option>
                  <Option value="302">302</Option>
                </Select>
              </Form.Item>
              <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type} noStyle>
                {({ getFieldValue }) => {
                  const type = getFieldValue('type');
                  return (
                    <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: '500', marginLeft: '4px' }}>
                      {type === '301' ? 'Kalıcı Yönlendirme' : 'Geçici Yönlendirme'}
                    </div>
                  );
                }}
              </Form.Item>
            </div>
            <Form.Item name="status" label="Durum" style={{ flex: 1 }} initialValue="Aktif">
              <Select size="large">
                <Option value="Aktif">Aktif</Option>
                <Option value="Pasif">Pasif</Option>
              </Select>
            </Form.Item>
          </Space>
        </Form>
      </Drawer>

      {/* Excel Import Drawer */}
      <Drawer
        title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Toplu İçe Aktar (Excel)</span>}
        placement="right"
        width={500}
        onClose={() => setImportDrawerVisible(false)}
        open={importDrawerVisible}
        closeIcon={null}
        extra={
          <Button 
            type="text" 
            icon={<span style={{ fontSize: '20px' }}>&times;</span>} 
            onClick={() => setImportDrawerVisible(false)}
            style={{ color: token.colorTextDescription }}
          />
        }
        styles={{ 
          header: { padding: '24px' }, 
          body: { padding: '24px' },
          footer: { borderTop: `1px solid ${token.colorBorderSecondary}`, padding: '16px 24px' }
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setImportDrawerVisible(false)} size="large" style={{ borderRadius: '8px' }}>
              Vazgeç
            </Button>
          </div>
        }
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Alert
            message="Bilgilendirme"
            description="Lütfen şablon dosyasına uygun bir Excel dosyası yükleyiniz. Maksimum 5000 satır desteklenmektedir."
            type="info"
            showIcon
          />
          
          <div>
            <Text strong>1. Şablonu İndirin</Text>
            <div style={{ marginTop: '8px' }}>
              <Button icon={<FileExcelOutlined />} block>Örnek Excel Şablonunu İndir</Button>
            </div>
          </div>

          <Divider style={{ margin: '8px 0' }} />

          <div>
            <Text strong>2. Dosya Yükleyin</Text>
            <div style={{ marginTop: '12px' }}>
              <Upload.Dragger multiple={false} maxCount={1}>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ color: token.colorPrimary }} />
                </p>
                <p className="ant-upload-text">Dosyayı buraya sürükleyin veya seçin</p>
                <p className="ant-upload-hint">Yalnızca .xlsx veya .csv dosyaları desteklenir.</p>
              </Upload.Dragger>
            </div>
          </div>

          <Button type="primary" size="large" block style={{ marginTop: '24px', backgroundColor: '#10b981', borderColor: '#10b981' }}>
            İçeri Aktarmaya Başla
          </Button>
        </Space>
      </Drawer>

    </div>
  );
};

export default RedirectList;
