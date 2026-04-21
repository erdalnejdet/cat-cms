import React from 'react';
import { Breadcrumb, Card, Space, Typography, theme, Tag, Tooltip } from 'antd';
import { HistoryOutlined, UserOutlined, ClockCircleOutlined, InfoCircleOutlined, GlobalOutlined } from '@ant-design/icons';
import type { ColDef } from 'ag-grid-community';
import DataGrid from '../../components/common/DataGrid';

const { Title, Text } = Typography;
const { useToken } = theme;

const initialData = [
  { id: 1, user: 'mbc@madebycat.com', action: 'Giriş Yapıldı', module: 'Auth', timestamp: '2024-03-24 10:30:15', ip: '192.168.1.1', status: 'Başarılı' },
  { id: 2, user: 'mbc@madebycat.com', action: 'Kategori Güncellendi: Haberler', module: 'Kategoriler', timestamp: '2024-03-24 11:15:22', ip: '192.168.1.1', status: 'Başarılı' },
  { id: 3, user: 'editor@madebycat.com', action: 'Yeni Site Eklendi: Genvera', module: 'Siteler', timestamp: '2024-03-24 12:05:10', ip: '192.168.1.45', status: 'Başarılı' },
  { id: 4, user: 'mbc@madebycat.com', action: 'Yönlendirme Silindi: /eski-url', module: 'Yönlendirmeler', timestamp: '2024-03-24 14:45:00', ip: '192.168.1.1', status: 'Başarılı' },
  { id: 5, user: 'unknown@user.com', action: 'Hatalı Şifre Denemesi', module: 'Auth', timestamp: '2024-03-24 15:20:33', ip: '172.16.5.12', status: 'Hata' },
  { id: 6, user: 'mbc@madebycat.com', action: 'Kullanıcı Rolü Değiştirildi: editor', module: 'Kullanıcılar', timestamp: '2024-03-24 16:10:05', ip: '192.168.1.1', status: 'Başarılı' },
];

// Internal Avatar shim defined before use to avoid hoisting issues
const Avatar = ({ icon, style, size }: any) => {
  return (
    <div style={{
      width: size === 'small' ? '24px' : '32px',    
      height: size === 'small' ? '24px' : '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size === 'small' ? '12px' : '14px',
      ...style
    }}>
      {icon}
    </div>
  );
};

const LogList: React.FC = () => {
  const { token } = useToken();

  const columnDefs: ColDef[] = [
    {
      field: 'user',
      headerName: 'Kullanıcı',
      flex: 1.5,
      minWidth: 180,
      cellRenderer: (params: any) => (
        <Space size="small">
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: token.colorPrimaryBg, color: token.colorPrimary }} />
          <Text strong>{params.value}</Text>
        </Space>
      )
    },
    {
      field: 'action',
      headerName: 'İşlem',
      flex: 2,
      minWidth: 250,
      cellRenderer: (params: any) => (
        <Tooltip title={params.value}>
          <Text ellipsis style={{ maxWidth: '100%' }}>{params.value}</Text>
        </Tooltip>
      )
    },
    {
      field: 'module',
      headerName: 'Modül',
      flex: 1,
      minWidth: 120,
      cellRenderer: (params: any) => (
        <Tag bordered={false} color={token.colorFillSecondary} style={{ borderRadius: '4px' }}>
          {params.value}
        </Tag>
      )
    },
    {
      field: 'timestamp',
      headerName: 'Tarih / Saat',
      flex: 1.2,
      minWidth: 160,
      cellRenderer: (params: any) => (
        <Space size="small">
          <ClockCircleOutlined style={{ color: token.colorTextDescription }} />
          <Text style={{ fontSize: '13px' }}>{params.value}</Text>
        </Space>
      )
    },
    {
      field: 'ip',
      headerName: 'IP Adresi',
      flex: 1,
      minWidth: 130,
      cellRenderer: (params: any) => (
        <Space size="small">
          <GlobalOutlined style={{ color: token.colorTextDescription, fontSize: '12px' }} />
          <Text type="secondary" style={{ fontSize: '12px' }}>{params.value}</Text>
        </Space>
      )
    },
    {
      field: 'status',
      headerName: 'Durum',
      flex: 0.8,
      minWidth: 100,
      cellRenderer: (params: any) => (
        <Tag color={params.value === 'Başarılı' ? 'success' : 'error'} bordered={false} style={{ borderRadius: '12px' }}>
          {params.value}
        </Tag>
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
            <Title level={3} style={{ margin: '0 0 4px 0', color: token.colorText }}>Sistem Logları</Title>
            <Breadcrumb
              items={[
                { title: 'Anasayfa' },
                { title: 'Sistem Yönetimi' },
                { title: 'İşlem Geçmişi' },
              ]}
            />
          </div>
          <div style={{ padding: '8px 16px', background: token.colorInfoBg, borderRadius: '8px', color: token.colorInfo, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoCircleOutlined />
            <Text type="secondary" style={{ color: token.colorInfo, fontSize: '13px' }}>Son 30 günlük işlem verileri listelenmektedir.</Text>
          </div>
        </div>
      </Card>

      <Card
        styles={{
          header: { borderBottom: `1px solid ${token.colorBorderSecondary}`, padding: '16px 24px' },
          body: { padding: '24px' }
        }}
        title={
          <Space>
            <HistoryOutlined style={{ color: token.colorPrimary, fontSize: '20px' }} />
            <span style={{ fontSize: '18px', fontWeight: '700' }}>Kullanıcı İşlem Geçmişi</span>
          </Space>
        }
        style={{
          borderRadius: '16px',
          borderColor: token.colorBorderSecondary,
          overflow: 'hidden',
          boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
        }}
      >
        <DataGrid rowData={initialData} columnDefs={columnDefs} />
      </Card>

    </div>
  );
};

export default LogList;
